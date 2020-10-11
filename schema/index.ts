import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import allStations from './allStations';
import station from './station';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query type',
  fields: () => ({
    allStations,
    station,
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
