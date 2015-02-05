/**
 * Created by shainazt on 2/4/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    noOfPeople: {
        type: Number,
        default: 0,
        required: false
    },
    billableCount: {
        type: Number,
        default: 0,
        required: false
    },
    benchCount: {
        type: Number,
        default: 0,
        required: false
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: false
        }]
    ,
    employees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'employee',
            required: false
        }]


})

mongoose.model('organization', organizationSchema);