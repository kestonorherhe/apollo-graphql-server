const Post = require('../models/Post')
const { promisify } = require('../helpers/promisify')

const resolvers = {
    firstPost: question => promisify(Post.findById(question.firstPostId)),
    answers: question => promisify(Post.find({ _id: { $in: question.answerIds } }))
}

module.exports = resolvers