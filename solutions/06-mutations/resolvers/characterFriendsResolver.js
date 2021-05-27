export default async (obj, args, { supabase }) => {
    const { data, error } = await supabase
      .from('character_friends')
      .select('friend_id(human_id(*), droid_id(*), wookie_id(*))')
      .filter('character_id', 'eq', obj.id);
    if (error) {
        console.error(error);
    }
    return data.map((o) => o.friend_id).map(o => o.human_id || o.droid_id || o.wookie_id);
};