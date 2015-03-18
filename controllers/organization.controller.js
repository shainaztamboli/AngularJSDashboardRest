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
                var newOrgList = [];
                var tasks = [];
                organizations.forEach(function (org) {
                    var newOrg = {};
                    newOrgList.push(newOrg);
                    tasks.push(function (callback) {
                        Project.find({belongs_to: org}, function (err, result) {
                            if (err) {
                                console.log("Error while fetching Projects." + err);
                            }
                            if (result) {
                                newOrg._id = org._id;
                                newOrg.name = org.name;
                                newOrg.total_people = org.total_people;
                                newOrg.billable_headcount = org.billable_headcount;
                                newOrg.bench_strength = org.bench_strength;
                                newOrg.owner = org.owner;
                                newOrg.projects = result;
                                callback(err, newOrg);
                            } else {
                                console.log("Error: Projects not found");
                            }
                        });
                    });

                    tasks.push(function (callback) {
                        Employee.find({belongs_to: org}, function (err, result) {
                            if (err) {
                                console.log("Error while fetching Employees." + err);
                            }
                            if (result) {
                                console.log("Employees: "+result);
                                newOrg.employees = result;
                                callback(err, newOrg);
                            } else {
                                console.log("Error: Employees not found");
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
                            res.send(newOrgList);
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
        .exec(function (err, organization) {
            if (err) {
                next(err);
            }
            if (organization) {
                var org = {};
                var tasks = [];
                tasks.push(function (callback) {
                    Project.find({belongs_to: organization}, function (err, result) {
                        if (err) {
                            console.log("Projects not found for Org.")
                            console.error(err);
                        }
                        if (result) {
                            org._id = organization._id;
                            org.name = organization.name;
                            org.total_people = organization.total_people;
                            org.billable_headcount = organization.billable_headcount;
                            org.bench_strength = organization.bench_strength;
                            org.owner = organization.owner;
                            org.projects = result;
                            callback(err, org);
                        }
                    });
                    tasks.push(function (callback) {
                        Employee.find({belongs_to: organization}, function (err, result) {
                            if (err) {
                                console.log("Error while fetching Employees." + err);
                            }
                            if (result) {
                                console.log("Employees: "+result);
                                org.employees = result;
                                callback(err, org);
                            } else {
                                console.log("Error: Employees not found");
                            }
                        });
                    });
                });
                async.parallel(
                    tasks, function (err, result) {
                        if (err) {
                            console.log("Unable to fetch Projects.");
                            console.log(err);
                            next(err);
                        } else {
                            req.org  = org;
                            next();
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
    Organization.findOne({_id: org._id})
        .populate('projects')
        .populate('employees')
        .exec(function (err, organization) {
            if (err) {
                next(err);
            }
            if (organization) {
                organization.name = req.body.name;
                organization.total_people = req.body.total_people;
                organization.billable_headcount = req.body.billable_headcount;
                organization.bench_strength = req.body.bench_strength;
                var tasks = [];
                var owner = req.body.owner;
                if (owner != undefined) {
                    organization.owner = undefined;
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
                                organization.owner = result.value;
                            }
                            organization.save(function (err) {
                                if (err) {
                                    console.log("Unable to save organization.");
                                    console.log(err);
                                } else {
                                    res.send(organization);
                                }
                            });
                        }
                    });

            } else {
                var error = {
                    error: "Organization not found"
                }
                res.status(404).send(error);
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