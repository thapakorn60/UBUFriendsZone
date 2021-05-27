const mongoose = require('mongoose');
const Post = mongoose.Schema({
    name: String,
    eventname: String,
    userid: String,
    description: String,
    type: Object,
    datetime: Date,
    starttime: String,
    endtime: String,
    place: String,
    location: [],
    amount: String,
    // reqtojoin: Array
}, { timestamps: true });
module.exports = mongoose.model('Posts', Post);