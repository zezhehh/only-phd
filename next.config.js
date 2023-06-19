/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.experiments = { ...config.experiments, asyncWebAssembly: true }
        config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
        return config
    },
    env: {
        NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN: "pk.eyJ1Ijoia2lraTA4MDUiLCJhIjoiY2tlenUxeXR5MG9peDJzbzhwYzJtMTQxMCJ9.Y0xE8Ool-PtkC94doPGmwg", //process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
      },
}

module.exports = nextConfig
