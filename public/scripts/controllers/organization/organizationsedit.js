'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controllers:OrganizationseditCtrl
 * @description
 * # OrganizationseditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationsEditCtrl', ['$scope', '$state', '$stateParams', 'OrganizationService', 'EmployeeService',
    function ($scope, $state, $stateParams, OrganizationService, EmployeeService) {
      if ($stateParams.orgId == '') {
        EmployeeService.fetchAllEmployees(function (result) {
          $scope.title = "Add Organization";
          $scope.org = {
            edit: false
          };
          console.log("Employees: " + result)
          $scope.employees = result;
        });

      } else {
        $scope.title = "Edit Organization";
        OrganizationService.getOrg($stateParams.orgId, function (result) {
          $scope.org = result;
          $scope.org.edit = true;
          $scope.employees = result.employees;
          console.log("Edit: " + $scope.org.employees);
        });

      }

      $scope.saveOrg = function () {
        $scope.organizations = [];
        if ($stateParams.orgId == '') {
          OrganizationService.saveOrg($scope.org, function (result) {
            $state.transitionTo("organizations.list");
          });
        } else {
          OrganizationService.updateOrg($scope.org, function (result) {
            $state.transitionTo('organizations.view', {"orgId": result._id});
          });

        }
      }

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }]);
