import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import MySchema from './schema';

const app = express();

app.use(morgan('common'));

app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: MySchema,
    graphiql: true,
  })
);

app.listen(4000);
