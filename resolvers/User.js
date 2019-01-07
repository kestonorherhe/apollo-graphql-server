const Post = require('../models/Post')
const { promisify } = require('../helpers/promisify')

const resolvers = {
    posts: (user, args) => promisify(Post.find({ _id: { $in: user.postIds } }).skip(args.query.offset).limit(args.query.limit)),
    postCount: user => user.postIds.length
}

module.exports = resolvers 