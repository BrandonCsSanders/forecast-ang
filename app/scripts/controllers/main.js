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

    $scope.$watch(function () {
      return me.result;
    }, function (newVal) {
      if (!newVal.geometry) {
        return;
      }
      console.log(me.result);
      me.map.center.latitude = newVal.geometry.location.lat();
      me.map.center.longitude = newVal.geometry.location.lng();
    });
  });
