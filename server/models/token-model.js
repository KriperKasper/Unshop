const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    user: {required: true, type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {required: true, type: String},
})

module.exports = model('Token', TokenSchema);