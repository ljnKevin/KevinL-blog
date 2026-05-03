export const apiVersion = '2024-02-12'

const sanityDataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET
const sanityProjectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const sanityUseCdn =
  process.env.SANITY_STUDIO_USE_CDN || process.env.NEXT_PUBLIC_SANITY_USE_CDN

export const dataset = assertValue(
  sanityDataset,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  sanityProjectId,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = sanityUseCdn === 'true'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
