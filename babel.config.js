module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset'],
    ["env", {
      "modules": false,
      "useBuiltIns": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      },
      "test": {
        "plugins": ["babel-jest", "@babel/plugin-transform-runtime"]
      }
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ],
  "env": {
    "test": {
      "presets": ["env"]
    }
  }
}
