
 const isProd = process.env.NODE_ENV === "production";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd ? "/minskin/" : "/",
};
export default config;
