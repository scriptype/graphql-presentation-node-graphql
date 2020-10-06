import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql'
import fetch from 'node-fetch'

const { API_BASE_URL } = process.env

const StationType = new GraphQLObjectType({
  name: 'Station',
  description: 'A charging station',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'ID',
      resolve: obj => obj.station_ID
    },
    name: {
      type: GraphQLString,
      description: 'Name'
    },
    status: {
      type: GraphQLString,
      description: 'Status'
    },
    available: {
      type: GraphQLInt,
      description: 'Availability'
    },
    connected: {
      type: GraphQLInt,
      description: 'Connectivity'
    },
    disabled: {
      type: GraphQLInt,
      description: 'Disabled or not'
    },
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query type',
  fields: () => ({
    allStations: {
      type: new GraphQLList(StationType),
      description: 'All stations',
      resolve: (root, args, ctx) => fetch(`${API_BASE_URL}/stations`).then(res => res.json())
    },
    station: {
      type: StationType,
      description: 'A single charging station',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, args, ctx) => fetch(`${API_BASE_URL}/stations/${args.id}`).then(res => res.json())
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
})
