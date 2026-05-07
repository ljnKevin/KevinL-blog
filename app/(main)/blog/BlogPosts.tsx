import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { withTimeout } from '~/lib/promise'
import { redis } from '~/lib/redis'
import { getLatestBlogPosts } from '~/sanity/queries'

import { BlogPostCard } from './BlogPostCard'

const OPTIONAL_REDIS_TIMEOUT = 700

export async function BlogPosts({ limit = 5 }) {
  const posts = (await getLatestBlogPosts({ limit, forDisplay: true })) || []
  const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id))

  let views: number[] = []
  if (env.VERCEL_ENV === 'development') {
    views = posts.map(() => Math.floor(Math.random() * 1000))
  } else {
    if (postIdKeys.length > 0) {
      try {
        views =
          (await withTimeout(
            redis.mget<number[]>(...postIdKeys),
            OPTIONAL_REDIS_TIMEOUT
          )) ?? []
      } catch {
        views = []
      }
    }
  }

  return (
    <>
      {posts.map((post, idx) => (
        <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
      ))}
    </>
  )
}
