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
        location: '='
      },
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.props = {
          icon: {
            color: "#fff"
          },
          weatherTypes: [
            {
              type: 'minutely',
              label: 'Minutely'
            },
            {
              type: 'hourly',
              label: 'Hourly'
            },
            {
              type: 'daily',
              label: 'Daily'
            }
          ]
        };

        scope.state = {
          weatherType: scope.props.weatherTypes[1],
          forecastData: {}
        };

        // wait for the data to come in.
        scope.$watch(function() {
          return scope.location.latitude + scope.location.longitude
        }, function(newVal) {
          if(newVal && scope.location.latitude && scope.location.longitude) {
            getWeather(scope.location);
          }
        });

        function getWeather(newVal) {
          ForecastService.Forecast.get(newVal).$promise.then(function(data) {
            console.log(data);
            scope.state.forecastData = data;
          });

          // hourly
          /*
           apparentTemperature: 59.65
           cloudCover:          0.05
           dewPoint:            52.1
           humidity:            0.76
           icon:                "clear-night"
           ozone:               303.75
           precipIntensity:     0
           precipProbability:   0
           pressure:            1017.4
           summary:             "Clear"
           temperature:         59.65
           time:                1472540400
           visibility:          9.86
           windBearing:         272
           windSpeed:           1.79
           */
        }

        scope.setWeatherType = function(weatherType) {
          scope.state.weatherType = weatherType;
        }
      }
    };
  }]);
