'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controllers:LineCtrl
 * @description
 * # LineCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('LineCtrl', function ($scope) {
    $scope.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    $scope.series = ['Billable', 'Bench'];
    $scope.legend = true;
    $scope.data = [
      [170, 185, 180, 190, 200],
      [28, 48, 40, 19, 86]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  });

