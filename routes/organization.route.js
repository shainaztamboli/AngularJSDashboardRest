/**
 * Created by shainazt on 2/4/2015.
 */
var organizationCtrl = require('../controllers/organization.controller.js');
module.exports = function (app) {
    app.route("/api/organization")
        .get(organizationCtrl.fetchAllOrgs)
        .post(organizationCtrl.createOrg);

    app.route("/api/organization/:orgId")
        .put(organizationCtrl.updateOrg)
        .delete(organizationCtrl.deleteOrg)
        .get(organizationCtrl.getOrg);

    app.param("orgId", organizationCtrl.getByOrgId);
}