import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFieldConfig
} from 'graphql';
import fetch from 'node-fetch';

const { API_BASE_URL } = process.env;

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
    id: {
      type: GraphQLInt,
      description: 'ID',
      resolve: (station: any) => station.station_ID,
    },
    name: {
      type: GraphQLString,
      description: 'Name',
    },
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

type ConfigType = GraphQLFieldConfig<any, any, { [argName: string]: any; }>
const stationSchema: ConfigType = {
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
}

export default stationSchema
