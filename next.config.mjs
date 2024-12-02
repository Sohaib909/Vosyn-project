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
  async redirects() {
    return [
      // Redirect users from the base path to /home
      {
        source: "/",
        destination: "/home?tab=featured",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
