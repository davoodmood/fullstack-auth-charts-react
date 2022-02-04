/** @type {import('next').NextConfig} */

const path = require('path')


const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.node = {
        fs: 'empty',
        module: 'empty'
      }
    }
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx']
    return config
  }
}

module.exports = nextConfig
