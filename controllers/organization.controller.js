/**
 * Created by shainazt on 2/4/2015.
 */
var mongoose = require('mongoose'),
    Organization = mongoose.model('organization'),
    Project = mongoose.model('project'),
    Employee = mongoose.model('employee'),
    async = require('async');

exports.fetchAllOrgs = function (req, res, next) {
    Organization.find()
        .populate('owner')
        .exec(function (err, organizations) {
            if (err) {
                console.log("Unable to fetch Organizations List.");
                console.log(err);
            } else {
                var tasks = [];
                organizations.forEach(function (org) {
                    tasks.push(function (callback) {
                        Project.find({belongs_to: org}, function (err, result) {
                            if (err) {
                                console.log("Error while fetching Projects." + err);
                            }
                            if (result) {
                                org.projects = result;
                                console.log('org: ' + org.projects);
                                callback(err, org);
                            } else {
                                console.log("Error: Projects not found");
                            }
                        });
                    });
                });

                async.parallel(
                    tasks, function (err, results) {
                        if (err) {
                            console.log("Unable to fetch Projects.");
                            console.log(err);
                            next(err);
                        } else {
                            res.send(results);
                        }
                    });

            }
        });


}

exports.createOrg = function (req, res) {
    var tasks = [];
    var owner = req.body.owner;
    if (owner != undefined) {
        req.body.owner = undefined;
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
        tasks, function (err, result) {
            if (err) {
                console.log("Unable to save Projects and Employees");
                console.log(err);
            } else {
                var org = new Organization(req.body);
                if (result) {
                    org.owner = result.value;
                }
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
                var tasks = [];
                tasks.push(function (callback) {
                    Project.find({belongs_to: org}, function (err, result) {
                        if (err) {
                            console.log("Projects not found for Org.")
                            console.error(err);
                        }
                        if (result) {
                            org.projects = result;
                            req.org = org;
                            next();

                        }
                    });
                });
                async.parallel(
                    tasks, function (err, result) {
                        if (err) {
                            console.log("Unable to fetch Projects.");
                            console.log(err);
                            next(err);
                        } else {
                            res.send(result);
                        }
                    });

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
    org.total_people = req.body.total_people;
    org.billable_headcount = req.body.billable_headcount;
    org.bench_strength = req.body.bench_strength;

    var tasks = [];
    var owner = req.body.owner;
    if (owner != undefined) {
        org.owner = undefined;
        console.log("owner: " + owner);
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
        tasks, function (err, result) {
            if (err) {
                console.log("Unable to save Projects and Employees");
                console.log(err);
            } else {
                if (result) {
                    org.owner = result.value;
                }

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