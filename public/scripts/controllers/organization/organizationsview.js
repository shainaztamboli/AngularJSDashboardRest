'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controllers:OrganizationsviewCtrl
 * @description
 * # OrganizationsviewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationsViewCtrl', ['$scope','$state', '$stateParams', 'OrganizationService',
    function ($scope, $state, $stateParams, OrganizationService) {
      console.log('$stateParams: '+$stateParams);
      OrganizationService.getOrg($stateParams.orgId, function(result){
        $scope.org = result;
        $scope.org.labels = [];
        $scope.org.series = ['Billable', 'Bench'];
        $scope.org.legend = true;
        var billable = [];
        var bench = [];

        $scope.org.projects.forEach(function (project) {
          $scope.org.labels.push(project.name);
          billable.push(project.billable_headcount);
          bench.push(project.bench_strength);
        });
        $scope.org.data = [billable, bench];
      });

      $scope.deleteOrg = function () {
        OrganizationService.deleteOrg($scope.org, function(result){
          $state.transitionTo("organizations.list");
        });
       }

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }]);
