/**
 * Created by shainazt on 2/6/2015.
 */
var employeeCtrl = require('../controllers/employee.controller.js');
module.exports = function (app) {
    app.route("/api/employee")
        .get(employeeCtrl.fetchAllEmployees)
        .post(employeeCtrl.createEmployee);

    app.route("/api/employee/:employeeId")
        .put(employeeCtrl.updateEmployee)
        .delete(employeeCtrl.deleteEmployee)
        .get(employeeCtrl.getEmployee);

    app.param("employeeId", employeeCtrl.getByEmployeeId);
}