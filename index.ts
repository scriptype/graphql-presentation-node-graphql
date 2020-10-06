import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import dotenv from 'dotenv'
dotenv.config()

import MySchema from './schema'

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: MySchema,
  graphiql: true
}))

app.listen(5000)
