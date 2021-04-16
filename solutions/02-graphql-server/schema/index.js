import graphqlM from 'graphql';
import viewerType from './types/Viewer.js';
import humanType from './types/Human.js';
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
  } = graphqlM;

  /**
   *  type Query {
   *    strongestJedi: Human
   *    humans: [Human]
   *    viewer: Viewer
   *  }
   */
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: {
        type: viewerType,
        resolve: (obj, args, { viewer }) => {
          console.log('Resolver called: Query.viewer');
          return viewer;
        }
      },
      humans: {
        type: new GraphQLList(humanType),
        resolve: async (obj, args, { supabase }) => {
            console.log('Resolver called: Query.humans');
            const { data } = await supabase
            .from('human')
              .select('*');
            return data;
        }
      },
    }
  });
  
export default new GraphQLSchema({ query: queryType });