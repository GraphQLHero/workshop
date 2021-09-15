import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import humanType from './Human';
import { lukeSkywalker, leiaOrgana, hanSolo } from '../../database/fake';

const humans = [lukeSkywalker, leiaOrgana, hanSolo];

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    humans: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(humanType))),
      args: {
        isJedi: {
          type: GraphQLBoolean,
          description: 'Whether or not the human is a jedi.'
        }
      },
      resolve: (_, args) => {
        console.log('Resolver called: Query.humans');
        console.log(
          'Resolver called with args: ' + JSON.stringify(args, null, 2)
        );
        if (args.isJedi !== null) {
          return humans.filter(h => h.is_jedi === args.isJedi);
        }
        return humans;
      }
    },
    human: {
      type: humanType,
      description: 'Lookup a `Human` by its ID.',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of a `Human`.'
        }
      },
      resolve: (_, args) => {
        console.log('Resolver called: Query.human');
        console.log(
          'Resolver called with args: ' + JSON.stringify(args, null, 2)
        );
        return humans.find(human => human.id === args.id);
      }
    }
  }
});
