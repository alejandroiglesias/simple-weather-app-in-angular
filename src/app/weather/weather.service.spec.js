/* global WeatherService */

describe('WeatherService', () => {
  const openWeatherMapAppId = 123;
  let weatherService;

  beforeEach(angular.mock.inject(($http, $q) => {
    weatherService = new WeatherService($http, $q, openWeatherMapAppId);
  }));

  it('should initialize', angular.mock.inject(() => {
    const requestParams = {
      params: {
        APPID: openWeatherMapAppId,
        units: 'metric'
      }
    };
    expect(weatherService._$http).toBeDefined();
    expect(weatherService.requestParams).toEqual(requestParams);
  }));

  it('should request weather data', angular.mock.inject(($http, $httpBackend) => {
    const promiseResolveSpy = jasmine.createSpy('promiseResolveSpy');
    const promiseRejectSpy = jasmine.createSpy('promiseRejectSpy');
    $httpBackend
      .expectGET('http://api.openweathermap.org/data/2.5/weather?APPID=123&q=buenos+aires&units=metric')
      // OpenWeatherMap API returns `cod` 200 as a number.
      .respond({cod: 200});
    weatherService
      .getWeather('buenos aires')
      .then(promiseResolveSpy)
      .catch(promiseRejectSpy);
    $httpBackend.flush();
    expect(promiseResolveSpy).toHaveBeenCalledWith({cod: 200});
    expect(promiseRejectSpy).not.toHaveBeenCalled();
  }));

  it('should reject promise if API returns error code', angular.mock.inject(($http, $httpBackend) => {
    const promiseResolveSpy = jasmine.createSpy('promiseResolveSpy');
    const promiseRejectSpy = jasmine.createSpy('promiseRejectSpy');
    $httpBackend
      .expectGET('http://api.openweathermap.org/data/2.5/weather?APPID=123&q=buenos+aires&units=metric')
      // OpenWeatherMap API returns `cod` 404 as a string.
      .respond({cod: '404'});
    weatherService
      .getWeather('buenos aires')
      .then(promiseResolveSpy)
      .catch(promiseRejectSpy);
    $httpBackend.flush();
    expect(promiseResolveSpy).not.toHaveBeenCalled();
    expect(promiseRejectSpy).toHaveBeenCalled();
  }));
});
