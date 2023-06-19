/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
    },
}

module.exports = nextConfig
