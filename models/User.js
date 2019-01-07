const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    postIds: [Schema.Types.ObjectId]
}, { collection: 'User' })

module.exports = mongoose.model('User', userSchema) 