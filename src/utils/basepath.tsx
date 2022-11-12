const isProd = process.env.NODE_ENV === "production";
export const basepath = isProd ? "/minskin" : "";
