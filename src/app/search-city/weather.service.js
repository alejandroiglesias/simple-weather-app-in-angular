class weatherService {

  /** @ngInject */
  constructor($http, openWeatherMapAppId) {
    this._$http = $http;

    this.requestParams = {
      params: {
        APPID: openWeatherMapAppId,
        units: 'metric'
      }
    };
  }

  /**
   * Gets weather for a given city and returns a promise.
   * @param city
   * @returns {HttpPromise}
   */
  getWeather(city) {
    const params = angular.merge({params: {q: city}}, this.requestParams);
    return this._$http
      .get('http://api.openweathermap.org/data/2.5/weather', params)
      .then(response => {
        return response.data;
      });
  }
}

angular
  .module('app')
  .constant('openWeatherMapAppId', 'ed0cf75d34cbe0236f9e94985a91fea2')
  .service('weatherService', weatherService);
