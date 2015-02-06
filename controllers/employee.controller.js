/**
 * Created by shainazt on 2/6/2015.
 */
var mongoose = require('mongoose'),
    Organization = mongoose.model('organization'),
    Project = mongoose.model('project'),
    Employee = mongoose.model('employee'),
    async = require('async');

exports.fetchAllEmployees = function (req, res, next) {
    Employee.find()
        .populate('belongs_to')
        .populate('works_for')
        .exec(function (err, employees) {
            if (err) {
                next(err);
            }
            res.send(employees);
        });
}

exports.createEmployee = function (req, res) {
    var tasks = [];
    var belongs_to = req.body.belongs_to;
    if (belongs_to != undefined) {
        req.body.belongs_to = undefined;
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

    var works_for = req.body.works_for;
    if (works_for != undefined) {
        req.body.works_for = [];
        works_for.forEach(function (project, index) {
            tasks.push(function (callback) {
                Project.findOne({_id: project._id}, function (err, project) {
                    if (err) {
                        console.log("Error while fetching Project." + err);
                    }
                    if (owner) {
                        callback(err, {type: "project", value: project});
                    } else {
                        console.log("Error: Project not found");
                    }
                });
            });
        });
    }

    async.parallel(
        tasks, function (err, results) {
            if (err) {
                console.log("Unable to fetch Organization and Project.");
                console.log(err);
            } else {

                var employee = new Employee(req.body);
                if (results) {
                    results.forEach(function (result) {
                        if (result.type === 'project') {
                            employee.works_for.push(result.value);
                        }
                        else if (result.type === 'organization') {
                            employee.belongs_to = result.value;
                        }
                    });
                }
                console.log(employee);
                employee.save(function (err, project) {
                    if (err) {
                        console.log("Unable to save Employee.");
                        console.log(err);
                    } else {
                        res.send(employee);
                    }
                });
            }
        });
}

exports.getByEmployeeId = function (req, res, next, id) {
    Employee.findOne({_id: id})
        .populate('belongs_to')
        .populate('works_for')
        .exec(function (err, employee) {
            if (err) {
                next(err);
            }
            if (employee) {
                req.employee = employee;
                next();
            } else {
                var error = {
                    error: "Employee not found"
                }
                res.status(404).send(error);
            }
        })
}

exports.getEmployee = function (req, res) {
    res.send(req.employee);
}

exports.updateEmployee = function (req, res) {
    var employee = req.employee;
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.skills = req.body.skills;
    employee.years_of_exp = req.body.years_of_exp;
    employee.billable = req.body.billable;
    employee.billiability = req.body.billiability;

    var tasks = [];
    var belongs_to = req.body.belongs_to;
    if (belongs_to != undefined) {
        employee.belongs_to = undefined;
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

    var works_for = req.body.works_for;
    if (works_for != undefined) {
        employee.works_for = [];
        works_for.forEach(function (project, index) {
            tasks.push(function (callback) {
                Project.findOne({_id: project._id}, function (err, project) {
                    if (err) {
                        console.log("Error while fetching Project." + err);
                    }
                    if (owner) {
                        callback(err, {type: "project", value: project});
                    } else {
                        console.log("Error: Project not found");
                    }
                });
            });
        });
    }

    async.parallel(
        tasks, function (err, results) {
            if (err) {
                console.log("Unable to fetch Organization and Project.");
                console.log(err);
            } else {
                if (results) {
                    results.forEach(function (result) {
                        if (result.type === 'project') {
                            employee.works_for.push(result.value);
                        }
                        else if (result.type === 'organization') {
                            employee.belongs_to = result.value;
                        }
                    });
                }
                console.log(employee);
                employee.save(function (err, project) {
                    if (err) {
                        console.log("Unable to save Employee.");
                        console.log(err);
                    } else {
                        res.send(employee);
                    }
                });
            }
        });

}

exports.deleteEmployee = function (req, res) {
    var employee = req.employee;
    employee.remove(function (err) {
        if (err) {
            console.log("Unable To remove Employee");
            console.log(err);
            res.status(400).send(err.err);
        } else {
            res.send(employee);
        }
    });
}