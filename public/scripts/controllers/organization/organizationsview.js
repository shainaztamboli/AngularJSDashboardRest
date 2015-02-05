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
