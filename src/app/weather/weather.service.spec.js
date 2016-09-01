/* global WeatherService */

describe('WeatherService', () => {
  const openWeatherMapAppId = 123;
  let weatherService;

  beforeEach(angular.mock.inject($http => {
    weatherService = new WeatherService($http, openWeatherMapAppId);
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
    $httpBackend
      .expectGET('http://api.openweathermap.org/data/2.5/weather?APPID=123&q=buenos+aires&units=metric')
      .respond('WEATHER_DATA');
    weatherService.getWeather('buenos aires').then(promiseResolveSpy);
    $httpBackend.flush();
    expect(promiseResolveSpy).toHaveBeenCalledWith('WEATHER_DATA');
  }));
});
