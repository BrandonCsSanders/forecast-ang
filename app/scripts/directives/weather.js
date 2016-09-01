'use strict';

/**
 * @ngdoc directive
 * @name angApp.directive:weather
 * @description
 * # weather
 */
angular.module('angApp')
  .directive('weather', ['ForecastService', function (ForecastService) {
    return {
      templateUrl: 'views/directives/weather.html',
      restrict: 'E',
      scope: {
        location: '=?'
      },
      replace: true,
      link: function postLink(scope) {
        // weather widget properties
        scope.props = {
          icon: {
            color: '#fff'
          },
          weatherTypes: [
            {
              type: 'minutely',
              label: 'Minutely',
              dateType: 'shortTime'
            },
            {
              type: 'hourly',
              label: 'Hourly',
              dateType: 'shortTime'
            },
            {
              type: 'daily',
              label: 'Daily',
              dateType: 'mediumDate'
            }
          ]
        };

        // weather widget states
        scope.state = {
          weatherType: scope.props.weatherTypes[1],
          forecastData: {},
          dateType: 'shortTime',
          today: new Date()
        };

        // fetch the weather data from the service
        function getWeather(newVal) {
          ForecastService.Forecast.get(newVal).$promise.then(function(data) {
            scope.state.forecastData = data;
          });
        }

        // wait for the data to come in via registering a listener on the digest loop.
        scope.$watch(function() {
          return scope.location.latitude + scope.location.longitude;
        }, function(newVal) {
          if(newVal && scope.location.latitude && scope.location.longitude) {
            getWeather(scope.location);
          }
        });

        // on selecting a type from the dropdown, set the state
        scope.setWeatherType = function(weatherType) {
          scope.state.weatherType = weatherType;
        };
      }
    };
  }]);
