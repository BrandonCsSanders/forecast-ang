'use strict';

/**
 * @ngdoc service
 * @name angApp.forecast
 * @description
 * # forecast
 * Service in the angApp.
 */
angular.module('angApp')
  .service('ForecastService', ['$resource', ForecastService]);

function ForecastService($resource) {
  ///https://api.forecast.io/forecast/a8d5465e232e3f91637697095df995ab/37.8267,-122.423
  this._urlRoot = 'https://api.forecast.io/forecast/';
  this._key = 'a8d5465e232e3f91637697095df995ab';
  this.Forecast = $resource(this._urlRoot + ':key/:latitude,:longitude',
    {
      key: this._key,
      latitude: '@latitude',
      longitude: '@longitude',
      callback: 'JSON_CALLBACK'
    },{
      get: {
        method: 'JSONP',
        isArray: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    });

}
