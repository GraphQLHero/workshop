export default async (obj, args, { supabase }) => {
    const { data } = await supabase
      .from('character_friends')
      .select('friend_id(human_id(*), droid_id(*), wookie_id(*))')
      .filter('character_id', 'eq', obj.id);
    return data.map((o) => o.friend_id).map(o => o.human_id || o.droid_id || o.wookie_id);
};