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
        latitude: 45,
        longitude: -73
      },
      zoom: 8,
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
      me.map.center.latitude = newVal.geometry.location.lat();
      me.map.center.longitude = newVal.geometry.location.lng();
    });
  });
