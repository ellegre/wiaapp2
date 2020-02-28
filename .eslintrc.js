module.exports = {
  root: true,
  env: {
    "node": true,
    "browser": true,
    "es6": true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  //parser: "vue-eslint-parser",
  parserOptions: {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "parser": "babel-eslint",

  }
};
