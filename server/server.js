const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const expressGraphQL = require('express-graphql')

const db = require('../config/keys').MONGO_URI
const schema = require('./schema/schema')


const app = express()


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlas')
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err))

app.use(bodyParser.json())

app.use(cors())

app.use(
  '/graphql',
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    }
  })
)

module.exports = app
