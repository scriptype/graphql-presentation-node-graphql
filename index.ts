import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import MySchema from './schema';

const app = express();

app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: MySchema,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 5000);
