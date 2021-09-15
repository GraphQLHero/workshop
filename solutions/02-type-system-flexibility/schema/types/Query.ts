import { GraphQLObjectType, GraphQLList } from 'graphql';
import humanType from './Human';
import droidType from './Droid';
import wookieType from './Wookie';
import filmType from './Film';
import planetType from './Planet';
import {
  lukeSkywalker,
  leiaOrgana,
  hanSolo,
  r2d2,
  c3po,
  chewbacca,
  tatooine,
  yavin,
  corellia,
  alderaan,
  hoth,
  naboo,
  dagobah,
  newHope,
  empireStrikesBack,
  returnOfTheJedi,
  revengeOfTheSith,
  theForceAwakens,
  thePhantomMenace,
  attackOfTheClones
} from '../../utils/fakeDatabase';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    humans: {
      type: new GraphQLList(humanType),
      resolve: () => [lukeSkywalker, leiaOrgana, hanSolo]
    },
    planets: {
      type: new GraphQLList(planetType),
      resolve: () => [tatooine, yavin, corellia, alderaan, hoth, naboo, dagobah]
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: () => [
        newHope,
        empireStrikesBack,
        returnOfTheJedi,
        revengeOfTheSith,
        theForceAwakens,
        thePhantomMenace,
        attackOfTheClones
      ]
    },
    lukeSkywalker: {
      type: humanType,
      resolve: () => lukeSkywalker
    },
    leiaOrgana: {
      type: humanType,
      resolve: () => leiaOrgana
    },
    hanSolo: {
      type: humanType,
      resolve: () => hanSolo
    },
    r2d2: {
      type: droidType,
      resolve: () => r2d2
    },
    c3po: {
      type: droidType,
      resolve: () => c3po
    },
    chewbacca: {
      type: wookieType,
      resolve: () => chewbacca
    }
  }
});
