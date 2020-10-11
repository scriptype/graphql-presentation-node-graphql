import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import fetch from 'node-fetch';

const { API_BASE_URL } = process.env;

const commonFields = {
  id: {
    type: GraphQLInt,
    description: 'ID',
    resolve: (station: any) => station.station_ID,
  },
  name: {
    type: GraphQLString,
    description: 'Name',
  },
};

const StationSummaryType = new GraphQLObjectType({
  name: 'StationSummary',
  description: 'A charging station',
  fields: () => ({
    ...commonFields,
    operational: {
      type: GraphQLBoolean,
      description: 'Operational or not',
      resolve: (station) => !!station.available,
    },
  }),
});

const StationConnectorType = new GraphQLObjectType({
  name: 'StationConnector',
  description: 'Station connector info',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'Id',
      resolve: (connector) => connector.connector_id,
    },
    currentType: {
      type: GraphQLString,
      description: 'Current Type',
      resolve: (connector) => connector.current_type,
    },
    status: {
      type: GraphQLString,
      description: 'Status',
    },
    type: {
      type: GraphQLString,
      description: 'Type',
    },
  }),
});

const StationFullType = new GraphQLObjectType({
  name: 'StationFull',
  description: 'A charging station',
  fields: () => ({
    ...commonFields,
    status: {
      type: GraphQLString,
      description: 'Status',
    },
    available: {
      type: GraphQLBoolean,
      description: 'Availability',
      resolve: (station) => !!station.available,
    },
    connected: {
      type: GraphQLBoolean,
      description: 'Connectivity',
      resolve: (station) => !!station.connected,
    },
    disabled: {
      type: GraphQLBoolean,
      description: 'Disabled or not',
      resolve: (station) => !!station.disabled,
    },
    currency: {
      type: GraphQLString,
      description: 'Currency',
    },
    inuse: {
      type: GraphQLString,
      description: 'In use date',
    },
    connectors: {
      type: new GraphQLList(StationConnectorType),
      description: 'Connectors',
      resolve: (station) => station.connector_info,
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query type',
  fields: () => ({
    allStations: {
      type: new GraphQLList(StationSummaryType),
      description: 'All stations',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
      },
      resolve: (root, { first, last }, ctx) =>
        fetch(`${API_BASE_URL}/stations`)
          .then((res) => res.json())
          .then((json) => {
            if (first) {
              return json.slice(0, first);
            } else if (last) {
              return json.slice(last * -1);
            }
            return json;
          }),
    },
    station: {
      type: StationFullType,
      description: 'A single charging station',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, args, ctx) =>
        fetch(`${API_BASE_URL}/stations/${args.id}`).then((res) => {
          const contentType = res.headers.get('Content-Type');
          if (contentType && /text\/html/.test(contentType)) {
            return res.text().then((error) => {
              throw error;
            });
          }
          return res.json();
        }),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
