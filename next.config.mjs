/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "healthnetinternalmedicinespecialitycenter.com",
        pathname: "/public/storage/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
