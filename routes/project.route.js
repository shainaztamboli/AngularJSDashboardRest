/**
 * Created by shainazt on 2/6/2015.
 */
var projectCtrl = require('../controllers/project.controller.js');
module.exports = function (app) {
    app.route("/api/project")
        .get(projectCtrl.fetchAllProjects)
        .post(projectCtrl.createProject);

    app.route("/api/project/:projectId")
        .put(projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject)
        .get(projectCtrl.getProject);

    app.param("projectId", projectCtrl.getByProjectId);
}