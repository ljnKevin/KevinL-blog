import 'dotenv/config'

import { createReadStream } from 'node:fs'
import { readdir, readFile, stat } from 'node:fs/promises'
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  resolve,
} from 'node:path'

import matter from 'gray-matter'
import { createClient } from 'next-sanity'

import { estimateReadingMinutes } from '../lib/readingTime'

const DEFAULT_OBSIDIAN_OUTPUT_DIR =
  '/Users/ll/Documents/ObsidianVault/03 Outputs'
const apiVersion = '2024-02-12'
const imageExtensions = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.webp',
])
const moods = ['happy', 'sad', 'neutral'] as const

type Mood = (typeof moods)[number]
type ImageAsset = { _id: string; url: string }
type PublishResult = 'created' | 'updated' | 'skipped'

type PostFrontmatter = {
  title: string
  slug: string
  description: string
  publishedAt: string
  categories: string[]
  mainImage: string
  mood: Mood
}

function getEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

let client: ReturnType<typeof createClient> | null = null

function getClient(): ReturnType<typeof createClient> {
  client ??= createClient({
    apiVersion,
    dataset: getEnv('NEXT_PUBLIC_SANITY_DATASET'),
    projectId: getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    token: getEnv('SANITY_API_WRITE_TOKEN'),
    useCdn: false,
  })

  return client
}

function readString(
  data: Record<string, unknown>,
  key: string,
  filePath: string
): string {
  const value = data[key]

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${filePath}: frontmatter.${key} is required`)
  }

  return value.trim()
}

function readFirstString(
  data: Record<string, unknown>,
  keys: string[],
  filePath: string
): string {
  for (const key of keys) {
    const value = data[key]

    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim()
    }
  }

  throw new Error(`${filePath}: frontmatter.${keys.join(' or ')} is required`)
}

function stripMarkdownForExcerpt(markdown: string): string | undefined {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^\s*>?\s*\[![^\]]+\].*$/gm, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^#+\s+/gm, '')
    .replace(/[`*_~#>-]/g, '')
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .find(Boolean)
    ?.slice(0, 180)
    .trim()
}

function readDescription(
  data: Record<string, unknown>,
  content: string,
  filePath: string
): string {
  const value = data.description ?? data.summary

  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  const excerpt = stripMarkdownForExcerpt(content)
  if (excerpt) {
    return excerpt
  }

  throw new Error(`${filePath}: frontmatter.description or summary is required`)
}

function readOptionalStringArray(
  data: Record<string, unknown>,
  key: string,
  filePath: string
): string[] {
  const value = data[key]

  if (typeof value === 'undefined') {
    return []
  }

  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === 'string')
  ) {
    throw new Error(`${filePath}: frontmatter.${key} must be a string array`)
  }

  return Array.from(new Set(value.map((item) => item.trim()).filter(Boolean)))
}

function readCategories(
  data: Record<string, unknown>,
  filePath: string
): string[] {
  if (typeof data.categories !== 'undefined') {
    return readOptionalStringArray(data, 'categories', filePath)
  }

  if (typeof data.category === 'string' && data.category.trim().length > 0) {
    return [data.category.trim()]
  }

  return []
}

function isDraft(data: Record<string, unknown>): boolean {
  const status =
    typeof data.status === 'string' ? data.status.toLowerCase() : ''

  return (
    data.draft === true ||
    data.draft === 'true' ||
    status === 'draft' ||
    status === 'invisible'
  )
}

function readPublishedAt(
  data: Record<string, unknown>,
  filePath: string
): string {
  const value = data.publishedAt ?? data.date
  const date =
    value instanceof Date
      ? value
      : typeof value === 'string'
        ? new Date(
            /^\d{4}-\d{2}-\d{2}$/.test(value)
              ? `${value}T00:00:00+08:00`
              : value
          )
        : null

  if (!date || Number.isNaN(date.getTime())) {
    throw new Error(`${filePath}: frontmatter.publishedAt must be a valid date`)
  }

  return date.toISOString()
}

function readMood(data: Record<string, unknown>): Mood {
  return moods.includes(data.mood as Mood) ? (data.mood as Mood) : 'neutral'
}

function readFrontmatter(
  data: Record<string, unknown>,
  content: string,
  filePath: string
): PostFrontmatter {
  const slug = readString(data, 'slug', filePath)
  const title =
    typeof data.title === 'string' && data.title.trim().length > 0
      ? data.title.trim()
      : basename(filePath, extname(filePath))

  if (/[/\\]/.test(slug)) {
    throw new Error(`${filePath}: frontmatter.slug must not contain slashes`)
  }

  return {
    title,
    slug,
    description: readDescription(data, content, filePath),
    publishedAt: readPublishedAt(data, filePath),
    categories: readCategories(data, filePath),
    mainImage: readFirstString(data, ['mainImage', 'cover'], filePath),
    mood: readMood(data),
  }
}

function getWikiLinkTarget(value: string): string | null {
  const match = /^\[\[([^\]|]+)(?:\|[^\]]+)?\]\]$/.exec(value.trim())

  return match?.[1]?.trim() ?? null
}

async function getVaultRoot(markdownPath: string): Promise<string> {
  let current = dirname(markdownPath)

  while (current !== dirname(current)) {
    const obsidianDirectory = join(current, '.obsidian')
    const info = await stat(obsidianDirectory).catch(() => null)

    if (info?.isDirectory()) {
      return current
    }

    current = dirname(current)
  }

  return dirname(markdownPath)
}

async function findFileByBasename(
  directory: string,
  filename: string
): Promise<string | null> {
  const entries = await readdir(directory, { withFileTypes: true }).catch(
    () => []
  )

  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue
    }

    const entryPath = join(directory, entry.name)

    if (entry.isFile() && entry.name === filename) {
      return entryPath
    }

    if (entry.isDirectory()) {
      const match = await findFileByBasename(entryPath, filename)

      if (match) {
        return match
      }
    }
  }

  return null
}

async function resolveWikiLinkPath(
  markdownPath: string,
  value: string
): Promise<string | null> {
  const target = getWikiLinkTarget(value)

  if (!target) {
    return null
  }

  const directPath = resolve(dirname(markdownPath), decodeLocalPath(target))
  const directInfo = await stat(directPath).catch(() => null)

  if (directInfo?.isFile()) {
    return directPath
  }

  const vaultRoot = await getVaultRoot(markdownPath)
  return findFileByBasename(vaultRoot, basename(target))
}

function isRemoteOrRootPath(value: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('/')
}

function decodeLocalPath(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

async function resolveLocalContentPath(
  markdownPath: string,
  value: string
): Promise<string> {
  const wikiLinkPath = await resolveWikiLinkPath(markdownPath, value)
  if (wikiLinkPath) {
    return wikiLinkPath
  }

  if (isRemoteOrRootPath(value) && !isAbsolute(value)) {
    throw new Error(`${markdownPath}: expected a local file path, got ${value}`)
  }

  return isAbsolute(value)
    ? value
    : resolve(dirname(markdownPath), decodeLocalPath(value))
}

async function assertFile(filePath: string, label: string): Promise<void> {
  const info = await stat(filePath).catch(() => null)

  if (!info?.isFile()) {
    throw new Error(`${label} does not exist or is not a file: ${filePath}`)
  }
}

async function uploadImage(
  filePath: string,
  label: string
): Promise<ImageAsset> {
  await assertFile(filePath, label)

  const asset = (await getClient().assets.upload(
    'image',
    createReadStream(filePath),
    {
      filename: basename(filePath),
    }
  )) as ImageAsset

  console.log(`Uploaded ${label}: ${basename(filePath)}`)

  return asset
}

function parseImageTarget(rawTarget: string): {
  suffix: string
  url: string
  wrapInAngles: boolean
} {
  const trimmed = rawTarget.trim()

  if (trimmed.startsWith('<')) {
    const closingIndex = trimmed.indexOf('>')

    if (closingIndex !== -1) {
      return {
        suffix: trimmed.slice(closingIndex + 1),
        url: trimmed.slice(1, closingIndex),
        wrapInAngles: true,
      }
    }
  }

  const titleMatch = /^(.*?)(\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))$/.exec(trimmed)

  return {
    suffix: titleMatch?.[2] ?? '',
    url: (titleMatch?.[1] ?? trimmed).trim(),
    wrapInAngles: false,
  }
}

function getLocalImagePath(
  markdownPath: string,
  imageUrl: string
): string | null {
  if (
    /^[a-z][a-z0-9+.-]*:/i.test(imageUrl) ||
    imageUrl.startsWith('/') ||
    imageUrl.startsWith('#')
  ) {
    return null
  }

  const localPath = imageUrl.split(/[?#]/)[0] ?? ''

  if (!imageExtensions.has(extname(localPath).toLowerCase())) {
    return null
  }

  return resolve(dirname(markdownPath), decodeLocalPath(localPath))
}

async function uploadInlineImages(
  markdown: string,
  markdownPath: string
): Promise<string> {
  const uploadedUrls = new Map<string, string>()
  let rewrittenMarkdown = await uploadWikiImages(
    markdown,
    markdownPath,
    uploadedUrls
  )
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g
  let result = ''
  let lastIndex = 0

  for (const match of rewrittenMarkdown.matchAll(imagePattern)) {
    const matchIndex = match.index ?? 0
    const [fullMatch, alt = '', rawTarget = ''] = match
    const target = parseImageTarget(rawTarget)
    const imagePath = getLocalImagePath(markdownPath, target.url)

    if (!imagePath) {
      continue
    }

    result += rewrittenMarkdown.slice(lastIndex, matchIndex)

    const cachedUrl = uploadedUrls.get(imagePath)
    const imageUrl =
      cachedUrl ?? (await uploadImage(imagePath, 'inline image')).url
    uploadedUrls.set(imagePath, imageUrl)

    const renderedUrl = target.wrapInAngles ? `<${imageUrl}>` : imageUrl
    result += `![${alt}](${renderedUrl}${target.suffix})`
    lastIndex = matchIndex + fullMatch.length
  }

  return result + rewrittenMarkdown.slice(lastIndex)
}

async function uploadWikiImages(
  markdown: string,
  markdownPath: string,
  uploadedUrls: Map<string, string>
): Promise<string> {
  const imagePattern = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  let result = ''
  let lastIndex = 0

  for (const match of markdown.matchAll(imagePattern)) {
    const matchIndex = match.index ?? 0
    const [fullMatch, target = '', label] = match
    const imagePath = await resolveWikiLinkPath(markdownPath, `[[${target}]]`)

    if (!imagePath) {
      throw new Error(`${markdownPath}: inline image not found: ${target}`)
    }

    result += markdown.slice(lastIndex, matchIndex)

    const cachedUrl = uploadedUrls.get(imagePath)
    const imageUrl =
      cachedUrl ?? (await uploadImage(imagePath, 'inline image')).url
    uploadedUrls.set(imagePath, imageUrl)
    result += `![${label ?? basename(target, extname(target))}](${imageUrl})`
    lastIndex = matchIndex + fullMatch.length
  }

  return result + markdown.slice(lastIndex)
}

function slugifyCategory(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/[\s_-]+/g, '-') || 'category'
  )
}

async function getCategoryReferences(categories: string[]) {
  const references = []

  for (const title of categories) {
    const existing = await getClient().fetch<{ _id: string } | null>(
      '*[_type == "category" && title == $title][0]{_id}',
      { title }
    )

    const category =
      existing ??
      (await getClient().create({
        _type: 'category',
        slug: { _type: 'slug', current: slugifyCategory(title) },
        title,
      }))

    references.push({
      _key: category._id,
      _ref: category._id,
      _type: 'reference',
    })
  }

  return references
}

async function findExistingPost(slug: string): Promise<{ _id: string } | null> {
  const posts = await getClient().fetch<Array<{ _id: string }>>(
    '*[_type == "post" && slug.current == $slug]{_id}',
    { slug }
  )

  if (posts.length > 1) {
    throw new Error(`Multiple Sanity posts found for slug: ${slug}`)
  }

  return posts[0] ?? null
}

async function publishPost(markdownPath: string): Promise<PublishResult> {
  const absoluteMarkdownPath = resolve(markdownPath)
  await assertFile(absoluteMarkdownPath, 'Markdown file')

  const raw = await readFile(absoluteMarkdownPath, 'utf8')
  const parsed = matter(raw)
  const data = parsed.data as Record<string, unknown>

  if (isDraft(data)) {
    console.log(
      `Skipped draft post: ${typeof data.slug === 'string' ? data.slug : markdownPath}`
    )
    return 'skipped'
  }

  const frontmatter = readFrontmatter(
    data,
    parsed.content,
    absoluteMarkdownPath
  )
  const mainImagePath = await resolveLocalContentPath(
    absoluteMarkdownPath,
    frontmatter.mainImage
  )
  const [mainImage, body, categoryReferences] = await Promise.all([
    uploadImage(mainImagePath, 'main image'),
    uploadInlineImages(parsed.content, absoluteMarkdownPath),
    getCategoryReferences(frontmatter.categories),
  ])
  const postFields = {
    body,
    categories: categoryReferences,
    description: frontmatter.description,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: mainImage._id,
        _type: 'reference',
      },
    },
    mood: frontmatter.mood,
    publishedAt: frontmatter.publishedAt,
    readingTime: estimateReadingMinutes(body),
    slug: {
      _type: 'slug',
      current: frontmatter.slug,
    },
    title: frontmatter.title,
  }
  const existingPost = await findExistingPost(frontmatter.slug)

  if (existingPost) {
    await getClient().patch(existingPost._id).set(postFields).commit()
    console.log(`Updated post: ${frontmatter.slug}`)
    return 'updated'
  }

  await getClient().create({
    _type: 'post',
    ...postFields,
  })
  console.log(`Created post: ${frontmatter.slug}`)
  return 'created'
}

async function listMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith('.'))
      .map(async (entry) => {
        const entryPath = join(directory, entry.name)

        if (entry.isDirectory()) {
          return listMarkdownFiles(entryPath)
        }

        return entry.isFile() && extname(entry.name).toLowerCase() === '.md'
          ? [entryPath]
          : []
      })
  )

  return files.flat().sort()
}

function parseArgs(argv: string[]): {
  mode: 'directory' | 'file'
  path: string
} {
  if (argv[0] === '--dir') {
    return {
      mode: 'directory',
      path:
        argv[1] ??
        process.env.OBSIDIAN_OUTPUT_DIR ??
        DEFAULT_OBSIDIAN_OUTPUT_DIR,
    }
  }

  if (!argv[0]) {
    throw new Error(
      'Usage: pnpm publish:post <markdown-path> OR pnpm publish:posts [directory]'
    )
  }

  return { mode: 'file', path: argv[0] }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.mode === 'file') {
    await publishPost(args.path)
    return
  }

  const directory = resolve(args.path)
  const files = await listMarkdownFiles(directory)
  let failed = 0

  for (const file of files) {
    try {
      await publishPost(file)
    } catch (error) {
      failed += 1
      console.error(error instanceof Error ? error.message : error)
    }
  }

  if (failed > 0) {
    process.exitCode = 1
  }

  console.log(
    `Published directory: ${files.length - failed}/${files.length} OK`
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
