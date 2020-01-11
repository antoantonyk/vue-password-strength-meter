module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vue-password-strength-meter/"
      : "/",
  css: {
    extract: false
  }
};
