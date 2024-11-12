/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_PROD_URL: "https://api.vosynverse.com",
    REACT_APP_LANGUAGE_DETECTION_URL: "https://langdetectapi.vosynverse.com",
  },
  images: {
    remotePatterns: [
      {
        hostname: "flagsapi.com",
      },
      {
        hostname: "i.ytimg.com",
      },
      {
        hostname: "i.pinimg.com",
      },
      {
        hostname: "www.w3schools.com",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  experimental: {
    webVitalsAttribution: ["CLS", "FID", "LCP"],
  },
};

export default nextConfig;
