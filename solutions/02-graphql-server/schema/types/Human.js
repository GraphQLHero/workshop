import graphql from 'graphql';
import humanGender from '../enums/HumanGender.js';
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

/**
   *  type Human {
   *    id: ID
   *    name: String
   *    gender: HumanGender
   *    topSecretField: String
   *  }
   */
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
      topSecretField: {
        type: GraphQLString,
        resolve: (obj, args, context) => {
          console.log('Resolver called: Human.topSecretField');
          if (!context.viewer) return null;
          return 'Top Secret Info.';
        }
      }
    }
  });