'use strict';

/**
 * @ngdoc service
 * @name angApp.forecast
 * @description
 * # forecast
 * Service in the angApp.
 */

function ForecastService($resource) {
  this._urlRoot = 'https://api.forecast.io/forecast/';
  this._key = 'a8d5465e232e3f91637697095df995ab'; // forecast.io app key
  // register a JSONP resource
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

angular.module('angApp').service('ForecastService', ['$resource', ForecastService]);
