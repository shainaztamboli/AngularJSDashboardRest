'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.organization.service
 * @description
 * # organization.service
 * Service in the dashboardApp.
 */
angular.module("organization")
  .service("OrganizationService", ['$http', function ($http) {
    var service = {};

    service.baseRestUrl = 'http://localhost:3000';

    service.fetchAllOrgs = function(success){
      $http.get(service.baseRestUrl+'/api/organization').success(function (items) {
        success(items);
      });

    }

    service.getOrg = function (orgId, success) {
      $http.get(service.baseRestUrl+'/api/organization/'+orgId).success(function (org) {
        success(org);
      });
    }

    service.saveOrg = function (org, success) {
      $http.post(service.baseRestUrl+'/api/organization', org).success(function (result) {
       success(result);
      });
    }

    service.updateOrg = function (orgToUpdate, success) {
      $http.put(service.baseRestUrl+'/api/organization/' + orgToUpdate.id, orgToUpdate).success(function (result) {
        success(result);
      });
    }

    service.deleteOrg = function (org, success) {
      $http.delete(service.baseRestUrl+'/api/organization/' + org._id, org).success(function (result) {
        success(result);
      });

    }

    return service;
  }])
;

