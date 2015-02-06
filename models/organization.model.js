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
    total_people: {
        type: Number,
        default: 0,
        required: false
    },
    billable_headcount: {
        type: Number,
        default: 0,
        required: false
    },
    bench_strength: {
        type: Number,
        default: 0,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }
})

mongoose.model('organization', organizationSchema);