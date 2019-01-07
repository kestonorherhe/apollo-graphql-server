const mongoose = require('mongoose')
const Question = require('../models/Question')
const Post = require('../models/Post')
const User = require('../models/User')

const createQuestion = (id, title, firstPostId) => new Promise((resolve, reject) => {
    Question.create({ title, firstPostId, _id: id }, (err, result) => {
        if (err) reject(err)
        else resolve(result)
    })
})

const createPost = (id, content, authorId, questionId, isQuestion) => new Promise((resolve, reject) => {
    Post.create({content, authorId, questionId, isQuestion, _id: id}, (err, result) => {
        if (err) reject(err)
        else resolve(result)
    })
})

const appendPostToUser = (authorId, postId) => new Promise((resolve, reject) => {
    User.updateOne({_id: authorId}, {$push: {postIds: postId } }, (err, result) => {
        if (err) reject(err)
        else resolve(result)
    })
})

// Write Mutation Resolvers
const resolvers = {
    createQuestion: (_, args) => {
        const questionId = mongoose.Types.ObjectId()
        const postId = mongoose.Types.ObjectId()
        return Promise.all([
            createQuestion(questionId, args.input.title, postId),
            createPost(postId, args.input.content, args.input.authorId, questionId, true),
            appendPostToUser(args.input.authorId, postId)
        ])
        .then(result => result[0])
    },
    createAnswer: (_, args) => {
        const postId = mongoose.Types.ObjectId()
        return Promise.all([
            createPost(postId, args.input.content, args.input.authorId, args.input.questionId, false),
            appendPostToUser(args.input.authorId, postId)
        ])
        .then(result => result[0])
    },
    createUser: (_, args) => new Promise((resolve, reject) => {
        console.log(args);
        User.create({ username: args.input.username, postId: [] }, (err, result) => {
            if (err) reject(err) 
            else resolve(result)
        })
    })
}

module.exports = resolvers