'use strict';

/**
 * @ngdoc function
 * @name angApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angApp
 */
angular.module('angApp')
  .controller('MainCtrl', function ($scope) {
    var me = this;
    me.result = {};
    // default map options
    me.map = {
      center: {
        // Washington, DC, USA - default
        latitude: 38.907192300000006,
        longitude: -77.03687070000002
      },
      zoom: 9,
      otherOptions: {
        scrollwheel: false
      }
    };

    // when the results come in from the google-autocomplete field
    // and we have a geometry object update the map options so that
    // the map renders to the new lat/lng location.
    $scope.$watch(function () {
      return me.result;
    }, function (newVal) {
      if (!newVal.geometry) {
        return;
      }
      me.map.center.latitude = newVal.geometry.location.lat();
      me.map.center.longitude = newVal.geometry.location.lng();
    });
  });
