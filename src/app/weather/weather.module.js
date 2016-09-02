angular
  .module('weather', [])

  // TODO: move OpenWeatherMap API key outside source files tracked by Git. Use a JSON file at the root configured at the environment.
  .constant('openWeatherMapAppId', 'ed0cf75d34cbe0236f9e94985a91fea2');
