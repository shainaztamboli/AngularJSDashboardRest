'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controllers:BarchartCtrl
 * @description
 * # BarchartCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('BarchartCtrl', function ($scope) {
    $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.series = ['Billable', 'Bench'];
    $scope.legend = true;
    $scope.data = [
      [170, 185, 180, 190, 200, 205, 190, 210, 220, 223, 220, 250],
      [28, 48, 40, 19, 86, 27, 90, 20, 45, 23, 45, 56]
    ];
  });

