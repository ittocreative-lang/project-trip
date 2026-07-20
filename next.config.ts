import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.7",
    "http://192.168.1.7:3000",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-84b66bb5012247428ad554e379098e6d.r2.dev",
      },
    ],
  },
}

export default withNextIntl(nextConfig)