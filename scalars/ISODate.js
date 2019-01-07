const { Kind } = require('graphql/language')
const { GraphQLScalarType } = require('graphql')
const { returnOnError } = require('../helpers/promisify')

function serialize(value) {
    return value instanceof Date ? value.toISOString() : null
}

function parseValue(value) {
    return returnOnError(() => value === null ? null : new Date(value), null)
}

function parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseValue(ast.value) : null
}

module.exports = new GraphQLScalarType({
    name: 'ISODate',
    description: 'JavaScript Data object as an ISO timestamp',
    serialize, parseValue, parseLiteral
})