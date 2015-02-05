/**
 * Created by shainazt on 2/3/2015.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){
    console.log(config);
    var db = mongoose.connect(config.db, function(err){
        if(err){
            console.log("Unable To connect to DB.")
            console.log(err);
        }
    });
    require('../models/employee.model');
    require('../models/project.model');
    require('../models/organization.model');

    return db;
}