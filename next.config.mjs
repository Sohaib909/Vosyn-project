/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_PROD_URL: "https://api.vosynverse.com",
    REACT_APP_LANGUAGE_DETECTION_URL: "https://langdetectapi.vosynverse.com"
  },
  experimental: {
    webVitalsAttribution: ['CLS', 'FID', 'LCP']
  }
};

export default nextConfig;
