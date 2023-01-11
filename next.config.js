/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    hyvorTalkId: process.env.HYVOR_TALK_ID,
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}

module.exports = nextConfig
