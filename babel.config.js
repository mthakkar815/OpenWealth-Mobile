module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // or '@babel/preset-env' for React Native
    plugins: [
      [
        "module:react-native-dotenv", 
        {
          "moduleName": "@env", 
          "path": ".env"
        }
      ]
    ]
  };
};