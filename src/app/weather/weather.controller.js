class WeatherController {

  /** @ngInject */
  constructor($http, weatherService) {
    this._$http = $http;
    this._weatherService = weatherService;

    this.cities = {};
    this.date = Date.now();
  }

  /**
   * Adds city to the map of requested cities.
   * @param city
   */
  addCity(city) {
    // If we already have the city in our map, nothing needs to be done.
    if (this.cities[city.text]) {
      return;
    }
    this._getWeather(city).then(data => {
      this.cities[city.text] = data;
    });
  }

  /**
   * Gets weather from service for a given city.
   * @param city
   * @returns {HttpPromise}
   */
  _getWeather(city) {
    return this._weatherService.getWeather(city.text);
  }

  /**
   * Removes city from the map of requested cities.
   * @param city
   */
  removeCity(city) {
    // If city is not in our map, nothing needs to be done.
    if (!this.cities[city.text]) {
      return;
    }
    delete this.cities[city.text];
  }
}
