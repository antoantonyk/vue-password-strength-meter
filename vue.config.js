module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.APP_BASE_PATH : "/",
  css: {
    extract: false
  }
};
