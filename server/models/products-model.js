const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    products: {required: true, type: String},
})

module.exports = model('Products', TokenSchema);