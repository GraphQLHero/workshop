import { GraphQLFieldResolver } from 'graphql';

const resolver: GraphQLFieldResolver<
  any,
  { database: any },
  { [argName: string]: any }
> = async (obj, _, { database }) => {
  const { data, error } = await database
    .from('character_friends')
    .select('friend_id(human_id(*), droid_id(*), wookie_id(*))')
    .filter('character_id', 'eq', obj.id);
  if (error) {
    console.error(error);
  }
  return data
    .map(
      (o: {
        friend_id: { human_id: Object; droid_id: Object; wookie_id: Object };
      }) => o.friend_id
    )
    .map(
      (o: { human_id: Object; droid_id: Object; wookie_id: Object }) =>
        o.human_id || o.droid_id || o.wookie_id
    );
};

export default resolver;
