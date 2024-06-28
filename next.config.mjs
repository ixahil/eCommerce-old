/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        hostname: "api-ecommerce.sahildev.pro",
      },
    ],
  },
};

export default nextConfig;
