/**
 * Created by shainazt on 2/4/2015.
 */
var organizations = [];

var mongoose = require('mongoose'),
    Organization = mongoose.model('organization'),
    Project = mongoose.model('project'),
    Employee = mongoose.model('employee'),
    async = require('async');

exports.fetchAllOrgs = function (req, res, next) {
    Organization.find()
        .populate('projects')
        .populate('employees')
        .exec(function (err, organizations) {
            if (err) {
                next(err);
            }
            res.send(organizations);
        });
}

exports.createOrg = function (req, res) {
    var tasks = [];
    var projects = req.body.projects;
    projects.forEach(function (proj, index) {
        tasks.push(function (callback) {
            var project = new Project(proj);
            project.save(function (err, project) {
                callback(err, {type: "project", value: project});
            });
        });
    });

    var employees = req.body.employees;
    employees.forEach(function (emp, index) {
        tasks.push(function (callback) {
            var employee = new Employee(emp);
            employee.save(function (err, employee) {
                callback(err, {type: "employee", value: employee});
            });
        });
    });
    async.parallel(
        tasks, function (err, results) {
            if (err) {
                console.log("Unable to save Projects and Employees");
                console.log(err);
            } else {
                req.body.employees = [];
                req.body.projects = [];
                var org = new Organization(req.body);
                results.forEach(function (result) {
                    if (result.type === 'employee') {
                        org.employees.push(result.value);
                    }
                    else if (result.type === 'project') {
                        org.projects.push(result.value);
                    }
                });
                console.log(org);
                org.save(function (err) {
                    if (err) {
                        console.log("Unable to save organization.");
                        console.log(err);
                    } else {
                        res.send(org);
                    }
                });
            }
        });
}

exports.getByOrgId = function (req, res, next, id) {
    Organization.findOne({_id: id})
        .populate('projects')
        .populate('employees')
        .exec(function (err, org) {
            if (err) {
                next(err);
            }
            if (org) {
                req.org = org;
                next();
            } else {
                var error = {
                    error: "Organization not found"
                }
                res.status(404).send(error);
            }
        })
}

exports.getOrg = function (req, res) {
    res.send(req.org);
}

exports.updateOrg = function (req, res) {
    var org = req.org;
    org.name = req.body.name;
    org.noOfPeople = req.body.noOfPeople;
    org.billableCount = req.body.billableCount;
    org.benchCount = req.body.benchCount;
    org.employees = [];
    org.projects = [];

    var tasks = [];
    var projects = req.body.projects;
    projects.forEach(function (proj, index) {
        tasks.push(function (callback) {
            var project = new Project(proj);
            if(project._id==undefined) {
                project.save(function (err, project) {
                    callback(err, {type: "project", value: project});
                });
            }else{
                project.update(function (err, project) {
                    callback(err, {type: "project", value: project});
                });
            }


        });
    });

    var employees = req.body.employees;
    employees.forEach(function (emp, index) {
        tasks.push(function (callback) {
            var employee = new Employee(emp);
            if(employee._id == undefined) {
                employee.save(function (err, employee) {
                    callback(err, {type: "employee", value: employee});
                });
            }else{
                employee.update(function (err, employee) {
                    callback(err, {type: "employee", value: employee});
                });
            }
        });
    });
    async.parallel(
        tasks, function (err, results) {
            if (err) {
                console.log("Unable to save Projects and Employees");
                console.log(err);
            } else {
                results.forEach(function (result) {
                    if (result.type === 'employee') {
                        org.employees.push(result.value);
                    }
                    else if (result.type === 'project') {
                        org.projects.push(result.value);
                    }
                });
                console.log(org);
                org.save(function (err) {
                    if (err) {
                        console.log("Unable to save organization.");
                        console.log(err);
                    } else {
                        res.send(org);
                    }
                });
            }
        });

}

exports.deleteOrg = function (req, res) {
    var org = req.org;
    org.remove(function (err) {
        if (err) {
            console.log("Unable To remove Organization");
            console.log(err);
            res.status(400).send(err.err);
        } else {
            res.send(org);
        }
    });
}