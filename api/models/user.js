const mongo = require('mongoose');

const markSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: String,
    ph: String,
    address: String,
    points: Number
});

module.exports = mongo.model('User', markSchema);