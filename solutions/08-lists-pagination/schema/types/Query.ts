import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import {
  connectionFromArray,
  getOffsetWithDefault,
  forwardConnectionArgs,
  connectionFromArraySlice,
}  from 'graphql-relay';
import CharacterConnection from '../connections/CharacterConnection';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: new GraphQLNonNull(CharacterConnection),
      description: 'The characters of Star Wars.',
      args: forwardConnectionArgs,
      resolve: async (_, args, database) => {
        const offset = getOffsetWithDefault(args.after, 0);
        // Your custom paginated implementation
        const limit = args.first || 100;
        let { data, count } = await database
          .from('characters')
          .select('*', { count: 'exact' })
          .range(offset, offset + limit);
        if (!data)
          return {
            totalCount: 0,
            ...connectionFromArray([], args),
          };
        return {
          totalCount: count,
          ...connectionFromArraySlice(data, args, {
            sliceStart: offset,
            arrayLength: count,
          }),
        };
      },
    },
  }
});
