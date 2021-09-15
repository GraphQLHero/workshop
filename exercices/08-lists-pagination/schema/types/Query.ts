import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { forwardConnectionArgs, connectionFromArray } from 'graphql-relay';
import CharacterConnection from '../connections/CharacterConnection';

// Our objects fetched from our database
const lukeSkywalker = {
  name: 'Luke Skywalker',
};
const leiaOrgana = {
  name: 'Leia Organa',
};
const darthVader = {
  name: 'Anakin Skywalker',
};
const r2d2 = {
  name: 'R2-D2',
};
const c3po = {
  name: 'C-3PO',
};
const chewbacca = {
  name: 'Chewbacca',
};
const obiWan = {
  name: 'Obi-Wan Kenobi',
};
const hanSolo = {
  name: 'Han Solo',
};
const palpatine = {
  name: 'Palpatine',
};

const characters = [
  lukeSkywalker,
  leiaOrgana,
  darthVader,
  r2d2,
  c3po,
  chewbacca,
  obiWan,
  hanSolo,
  palpatine,
];

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: new GraphQLNonNull(CharacterConnection),
      description: 'The characters of Star Wars.',
      args: forwardConnectionArgs,
      resolve: (_, args) => connectionFromArray(characters, args),
    },
  }
});
