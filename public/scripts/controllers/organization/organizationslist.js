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
      $scope.organizations.forEach(function (org) {
        org.labels = [];
        org.series = ['Billable', 'Bench'];
        org.legend = true;
        var billable = [];
        var bench = [];

        org.projects.forEach(function (project) {
          org.labels.push(project.name);
          billable.push(project.billable_headcount);
          bench.push(project.bench_strength);
        });
        org.data = [billable, bench];
      });
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

