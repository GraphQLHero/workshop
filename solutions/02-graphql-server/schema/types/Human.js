import graphql from 'graphql';
import humanGender from '../enums/HumanGender.js';
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Human',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    gender: {
      type: humanGender,
    },
  },
});
