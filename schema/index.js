const { ApolloServer, gql } = require('apollo-server-express')
const Query = require('../resolvers/Query')
const Question = require('../resolvers/Question')
const Post = require('../resolvers/Post')
const User = require('../resolvers/User')
const Vote = require('../resolvers/Vote')
const Mutation = require('../resolvers/Mutation')
const ISODate = require('../scalars/ISODate')
// const resolvers = require("./resolvers")

const typeDefs = gql
    `
    type Query {
        questions(query: Pagination!): [Question]
        questionCount: Int
        question(id: ID!): Question
        users(query: Pagination!): [User]
        userCount: Int
        user(id: ID!): User
    }

    type Mutation {
        createQuestion(input: QuestionInput!): Question
        createAnswer(input: PostInput!): Post
        createUser(input: UserInput!): User
        createVote(input: VoteInput!): Vote
    } 

    type Question {
        id: ID!
        title: String!
        firstPost: Post
        answers: [Post]
    }

    type Post {
        id: ID!
        content: String!
        createdAt: ISODate
        author: User!
        votes: [Vote]
        voteCount: Int
        question: Question
        isQuestion: Boolean
    }

    type User {
        id: ID!
        username: String
        posts(query: Pagination!): [Post]
        postCount: Int
    }

    type Vote {
        _id: ID!
        author: User
        type: String
    }

    input Pagination {
        offset: Int
        limit: Int
    }

    input QuestionInput {
        title: String!
        content: String!
        authorId: ID
    }

    input PostInput {
        questionId: ID!
        content: String!
        authorId: ID!
    }

    input UserInput {
        username: String!
    }

    input VoteInput {
        postId: ID!
        type: String
    }

    scalar ISODate
`;

// Put all the resolvers together
const resolvers = { Query, Mutation, Question, Post, User, Vote, ISODate }

const schema = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: '/graphql',
        settings: {
            'editor.theme': 'light'
        }
    }
})
module.exports = schema; 