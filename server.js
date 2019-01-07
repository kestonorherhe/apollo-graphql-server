const express = require("express")
const mongoose = require('mongoose')
const config = require('./config/database')
const schema = require("./schema")

const app = express();
// Connect to database
mongoose.connect(config.database, { useNewUrlParser: true })

// verify connection 
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
})
// on database error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err)
})

schema.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${schema.graphqlPath}`)
)