/**
 * Created by shainazt on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema  = mongoose.Schema;

var projectSchema = new Schema({
    name:{
        type:String,
        required:true
    }

})

mongoose.model('project', projectSchema);