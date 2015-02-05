'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controllers:OrganizationslistctrlCtrl
 * @description
 * # OrganizationslistctrlCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationsListCtrl', ['$scope', 'OrganizationService', function ($scope, OrganizationService) {
    OrganizationService.fetchAllOrgs(function (orgs) {
      $scope.organizations = orgs;
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
