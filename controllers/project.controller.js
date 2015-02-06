/**
 * Created by shainazt on 2/6/2015.
 */
var mongoose = require('mongoose'),
    Organization = mongoose.model('organization'),
    Project = mongoose.model('project'),
    Employee = mongoose.model('employee'),
    async = require('async');

exports.fetchAllProjects = function (req, res, next) {
    Project.find()
        .populate('belongs_to')
        .populate('owner')
        .exec(function (err, projects) {
            if (err) {
                next(err);
            }
            res.send(projects);
        });
}

exports.createProject = function (req, res) {
    var tasks = [];

    var belongs_to = req.body.belongs_to;
    if (belongs_to != undefined) {
        req.body.belongs_to = undefined;
        console.log("belongs_to_id: " + belongs_to._id)
        tasks.push(function (callback) {
            Organization.findOne({_id: belongs_to._id}, function (err, org) {
                if (err) {
                    console.log("Error while fetching Organization." + err);
                }
                if (org) {
                    callback(err, {type: "organization", value: org});
                } else {
                    console.log("Error: Organization not found");
                }
            });
        });
    }


    var owner = req.body.owner;
    if (owner != undefined) {
        req.body.owner = undefined;
        tasks.push(function (callback) {
            Employee.findOne({_id: owner._id}, function (err, emp) {
                if (err) {
                    console.log("Error while fetching Employee." + err);
                }
                if (emp) {
                    callback(err, {type: "employee", value: emp});
                } else {
                    console.log("Error: Employee not found");
                }
            });
        });
    }
    async.parallel(
        tasks, function (err, results) {
            if (err) {
                console.log("Unable to fetch Organization and Employee.");
                console.log(err);
            } else {
                var project = new Project(req.body);
                if (results) {
                    results.forEach(function (result) {
                        console.log("result.type: " + result.type + " result.value: " + result.value);
                        if (result.type == 'employee') {
                            project.owner = result.value;
                        }
                        else if (result.type == 'organization') {
                            project.belongs_to = result.value;
                        }
                    });
                }
                project.save(function (err, project) {
                    if (err) {
                        console.log("Unable to save Project.");
                        console.log(err);
                    } else {
                        res.send(project);
                    }
                });
            }
        }
    )
    ;
}

exports.getByProjectId = function (req, res, next, id) {
    Project.findOne({_id: id})
        .populate('belongs_to')
        .populate('owner')
        .exec(function (err, project) {
            if (err) {
                next(err);
            }
            if (project) {
                req.project = project;
                next();
            } else {
                var error = {
                    error: "Project not found"
                }
                res.status(404).send(error);
            }
        })
}

exports.getProject = function (req, res) {
    res.send(req.project);
}

exports.updateProject = function (req, res) {
    var project = req.project;
    project.name = req.body.name;
    project.total_people = req.body.total_people;
    project.billable_headcount = req.body.billable_headcount;
    project.bench_strength = req.body.bench_strength;

    var tasks = [];
    var belongs_to = req.body.belongs_to;
    console.log("belongs_to: " + belongs_to);
    if (belongs_to != undefined) {
        project.belongs_to = undefined;
        tasks.push(function (callback) {
            Organization.findOne({_id: belongs_to._id}, function (err, belongs_to) {
                if (err) {
                    console.log("Error while fetching Organization." + err);
                }
                if (belongs_to) {
                    callback(err, {type: "organization", value: belongs_to});
                } else {
                    console.log("Error: Organization not found");
                }
            });
        });
    }


    var owner = req.body.owner;
    if (owner != undefined) {
        project.owner = undefined;
        tasks.push(function (callback) {
            Employee.findOne({_id: owner._id}, function (err, owner) {
                if (err) {
                    console.log("Error while fetching Employee." + err);
                }
                if (owner) {
                    callback(err, {type: "employee", value: owner});
                } else {
                    console.log("Error: Employee not found");
                }
            });
        });
    }
    async.parallel(
        tasks, function (err, results) {
            if (err) {
                console.log("Unable to fetch Organization and Employee.");
                console.log(err);
            } else {
                if (results) {
                    results.forEach(function (result) {
                        if (result.type === 'employee') {
                            project.owner = result.value;
                        }
                        else if (result.type === 'organization') {
                            project.belongs_to = result.value;
                        }
                    });
                }
                console.log(project);
                project.save(function (err, project) {
                    if (err) {
                        console.log("Unable to update Project.");
                        console.log(err);
                    } else {
                        res.send(project);
                    }
                });
            }
        });

}

exports.deleteProject = function (req, res) {
    var project = req.project;
    project.remove(function (err) {
        if (err) {
            console.log("Unable To remove Project");
            console.log(err);
            res.status(400).send(err.err);
        } else {
            res.send(project);
        }
    });
}
