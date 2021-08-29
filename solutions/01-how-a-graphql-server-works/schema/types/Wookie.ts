import {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
} from 'graphql';

const Wookie = new GraphQLObjectType({
    name: 'Wookie',
    fields: {
      id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      height: {
        type: GraphQLInt,
      },
      mass: {
        type: GraphQLFloat,
      },
      hairColor: {
        type: GraphQLString,
        resolve: (v) => v.hair_color,
      },
    },
});

export default Wookie;