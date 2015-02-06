/**
 * Created by shainazt on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    skills: [
        {
            type: String
        }
    ],
    years_of_exp: {
        type: Number,
        required: true
    },

    billable: {
        type: Boolean,
        required: true
    },

    billiability: [
        {
            type: String
        }
    ],

    works_for: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project'
        }
    ],

    belongs_to: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    }
})

mongoose.model('employee', employeeSchema);