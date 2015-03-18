'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'chart.js',
    'organization'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state("dashboard", {
        templateUrl: "../views/dashboard/dashboard.html",
        controller: "DashboardCtrl",
        url: "/dashboard"
      })
    $stateProvider
      .state("organizations", {
        templateUrl: "../views/organization/organizations.html",
        controller: "OrganizationsCtrl",
        url: "/organizations"
      })
    $stateProvider
      .state("organizations.list", {
        templateUrl: "../views/organization/organizations.list.html",
        controller: "OrganizationsListCtrl",
        url: "/list"
      })
    $stateProvider
      .state("organizations.view", {
        templateUrl: "../views/organization/organizations.view.html",
        controller: "OrganizationsViewCtrl",
        url: "/view/:orgId"
      })
    $stateProvider
      .state("organizations.edit", {
        templateUrl: "../views/organization/organizations.edit.html",
        controller: "OrganizationsEditCtrl",
        url: "/edit/:orgId"
      })
    $stateProvider
      .state("projects", {
        templateUrl: "../views/project/projects.html",
        controller: "ProjectCtrl",
        url: "/projects"
      })
    $stateProvider
      .state("projects.list", {
        templateUrl: "../views/project/projects.list.html",
        controller: "ProjectListCtrl",
        url: "/list"
      })
    $stateProvider
      .state("projects.edit", {
        templateUrl: "../views/project/projects.edit.html",
        controller: "ProjectEditCtrl",
        url: "/edit/:projectId"
      })
    $stateProvider
      .state("projects.view", {
        templateUrl: "../views/project/projects.view.html",
        controller: "ProjectsViewCtrl",
        url: "/view/:projectId"
      })
    $stateProvider
      .state("employee", {
        templateUrl: "../views/employee/employees.html",
        controller: "EmployeeCtrl",
        url: "/view/:employeeId"
      })
    $stateProvider
      .state("employee.list", {
        templateUrl: "../views/employee/employees.list.html",
        controller: "EmployeeListCtrl",
        url: "/list"
      })
    $stateProvider
      .state("employee.view", {
        templateUrl: "../views/employee/employees.view.html",
        controller: "EmployeeViewCtrl",
        url: "/view/:employeeId"
      })
    $stateProvider
      .state("employee.edit", {
        templateUrl: "../views/employee/employees.edit.html",
        controller: "EmployeeEditCtrl",
        url: "/edit/:employeeId"
      })


  })
  .run(function($state){
    $state.go("dashboard");
  });


