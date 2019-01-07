const User = require('../models/User')
const { promisify } = require('../helpers/promisify')

const resolvers = {
    author: vote => promisify(User.findById(vote.userId))
}

module.exports = resolvers