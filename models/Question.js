const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: String,
    firstPost: Schema.Types.ObjectId,
    answerIds: [Schema.Types.ObjectId]
}, { collection: 'Question' })

module.exports = mongoose.model('Question', questionSchema)