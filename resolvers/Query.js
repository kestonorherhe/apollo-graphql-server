const Question = require('../models/Question')
const User = require('../models/User')
const { promisify } = require('../helpers/promisify')

const resolvers = {
    questions: (_, args) => promisify(Question.find({}).sort('-createdAt').skip(args.query.offset).limit(args.query.limit)),
    question: (_, args) => promisify(Question.findById(args.id)),
    questionCount: () => promisify(Question.count()),
    users: (_, args) => promisify(User.find({}).skip(args.query.offset).limit(args.query.limit)),
    user: (_, args) => promisify(User.findById(args.id)),
    userCount: () => promisify(User.count())
}

module.exports = resolvers 