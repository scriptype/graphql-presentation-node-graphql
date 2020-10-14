import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFieldConfig,
} from 'graphql';
import fetch from 'node-fetch';

const { API_BASE_URL } = process.env;

const StationSummaryType = new GraphQLObjectType({
  name: 'StationSummary',
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
    operational: {
      type: GraphQLBoolean,
      description: 'Operational or not',
      resolve: (station) => !!station.available,
    },
  }),
});

type ConfigType = GraphQLFieldConfig<any, any, { [argName: string]: any }>;
const allStationsSchema: ConfigType = {
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
};

export default allStationsSchema;
