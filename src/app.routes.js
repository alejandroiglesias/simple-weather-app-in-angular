angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider /* , $locationProvider */) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/weather');

  $stateProvider
    .state('app', {
      url: '/weather',
      component: 'weather'
    });
}
