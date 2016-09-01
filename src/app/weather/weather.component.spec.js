/* global WeatherController */

describe('WeatherController', () => {
  let weatherController;

  beforeEach(angular.mock.module('weather'));
  beforeEach(angular.mock.inject(($http, weatherService) => {
    spyOn(Date, 'now').and.returnValue('DATE');
    weatherController = new WeatherController($http, weatherService);
  }));

  it('should initialize', angular.mock.inject(() => {
    expect(weatherController.cities).toEqual({});
    expect(weatherController.date).toEqual('DATE');
  }));

  it('should add a city to the map of requested cities', angular.mock.inject(($q, $rootScope) => {
    const deferred = $q.defer();
    spyOn(weatherController, '_getWeather').and.returnValue(deferred.promise);
    weatherController.addCity({text: 'buenos aires'});
    deferred.resolve('WEATHER_DATA');
    $rootScope.$apply();
    expect(weatherController._getWeather).toHaveBeenCalledWith({text: 'buenos aires'});
    expect(weatherController.cities['buenos aires']).toEqual('WEATHER_DATA');
  }));

  it('should not add a city that is already in the map of requested cities', () => {
    const cities = {'buenos aires': 'WEATHER_DATA'};
    weatherController.cities = cities;
    spyOn(weatherController, '_getWeather');
    weatherController.addCity({text: 'buenos aires'});
    expect(weatherController._getWeather).not.toHaveBeenCalled();
    expect(weatherController.cities).toEqual(cities);
  });

  it('should remove a city from the map of requested cities', () => {
    weatherController.cities = {'buenos aires': 'WEATHER_DATA'};
    weatherController.removeCity({text: 'buenos aires'});
    expect(weatherController.cities).toEqual({});
  });

  it('should get weather data', () => {
    spyOn(weatherController._weatherService, 'getWeather');
    weatherController._getWeather({text: 'buenos aires'});
    expect(weatherController._weatherService.getWeather).toHaveBeenCalledWith('buenos aires');
  });
});
