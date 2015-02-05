'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controllers:OrganizationseditCtrl
 * @description
 * # OrganizationseditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationsEditCtrl', ['$scope', '$state', '$stateParams', 'OrganizationService',
    function ($scope, $state, $stateParams, OrganizationService) {
      if ($stateParams.orgId == '') {
        console.log("Add: ");
        $scope.org = {

          name: '',

          employees: [
            {
              name: ''
            }
          ],

          projects: [
            {

              name: ''
            },

          ]
        };

      } else {
        console.log("Edit: "+$stateParams.orgId);
        OrganizationService.getOrg($stateParams.orgId, function(result){
          $scope.org = result;
        });

      }

      $scope.addProjects = function () {

        var proj = {
          name: ''
        }
        $scope.org.projects.push(proj);
      }

      $scope.addEmployees = function () {
        var emp = {
          name: ''
        }
        $scope.org.employees.push(emp);
      }

      $scope.saveOrg = function () {
        $scope.organizations = [];
        if ($stateParams.orgId == '') {
          OrganizationService.saveOrg($scope.org, function(result){
            $state.transitionTo("organizations.list");
          });
        } else {
          OrganizationService.updateOrg($scope.org, function(result){
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
