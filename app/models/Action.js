var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PointSchema   = new Schema({
    name: String,
    description: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedDate: {
        type: Date
    },
    isOpened: {
        type: Boolean,
        default: true
    },
    projectID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Point', PointSchema);