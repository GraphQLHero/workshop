import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { empireStrikesBack, newHope, tatooine, yavin } from '../../utils/fakeDatabase';
import { nodeField } from '../interfaces/Node';
import Film from './Film';
import Planet from './Planet';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    planet: {
      type: Planet,
      args: { id: { type: new GraphQLNonNull(GraphQLID)}},
      resolve: (_, {id}) => {
        switch (id) {
          case "1":
            return tatooine;
          case "2":
            return yavin; 
        }
        return null;
      }
    },
    film: {
      type: Film,
      args: { id: { type: new GraphQLNonNull(GraphQLID)}},
      resolve: (_, {id}) => {
        switch (id) {
          case "1":
            return newHope;
          case "2":
            return empireStrikesBack; 
        }
        return null;
      }
    }
  }
});
