const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {required: true, type: String, unique: true},
    password: {required: true, type: String},
})

module.exports = model('User', UserSchema);