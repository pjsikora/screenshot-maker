var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScreenshotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    isOpened: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Screenshot', ScreenshotSchema);