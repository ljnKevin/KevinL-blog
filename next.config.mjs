/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./env.mjs'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
      },
    ],
  },

  experimental: {
    taint: true,
  },

  redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/ljnKevin',
        permanent: true,
      },
      {
        source: '/douyin',
        destination: 'https://v.douyin.com/3fP50R7U204/',
        permanent: true,
      },
    ]
  },

  rewrites() {
    return [
      {
        source: '/photos',
        destination:
          'https://exif-photo-blog-kevinls-projects.vercel.app/photos',
      },
      {
        source: '/photos/:path*',
        destination:
          'https://exif-photo-blog-kevinls-projects.vercel.app/photos/:path*',
      },
    ]
  },
}

export default nextConfig
