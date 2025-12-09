/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ph'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  env: {
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    hyvorTalkId: process.env.HYVOR_TALK_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [require('path').join(__dirname, 'node_modules')],
  },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
//export default withBundleAnalyzer(nextConfig)
//module.exports = nextConfig
module.exports = withBundleAnalyzer(nextConfig)
