import graphql from 'graphql';
import characterInterface from './interfaces/Character.js';
import viewerType from './types/Viewer.js';
import filmType from './types/Film.js';
import planetType from './types/Planet.js';
import CharacterOrder from './inputs/CharacterOrder.js';
import DiameterFilter from './inputs/DiameterFilter.js';
import StarWarsSaga from './enums/StarWarsSaga.js';
const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = graphql;

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: {
        type: viewerType,
        resolve: (obj, args, { viewer }) => {
          return viewer;
        },
      },
      characters: {
        type: new GraphQLList(characterInterface),
        args: {
          orderBy: {
            type: CharacterOrder,
            defaultValue: { field: 'id', direction: 'DESC' },
          },
        },
        resolve: async (_, { orderBy }, { supabase }) => {
          const query = supabase
            .from('character')
            .select('human_id(*),droid_id(*),wookie_id(*)')
            .order(orderBy.field, { ascending: orderBy.direction === 'ASC' })
            ;
  
          const { data } = await query;
          return data.map(o => o.human_id || o.droid_id || o.wookie_id);;
        },
      },
      planets: {
        type: new GraphQLList(planetType),
        args: {
          diameter: {
            type: DiameterFilter,
          },
        },
        resolve: async (_, { diameter }, { supabase }) => {
          const query = supabase.from('planet').select('*');
  
          if (diameter) {
            const { min, max } = diameter;
            query.gte('diameter', min).lte('diameter', max);
          }
  
          const { data } = await query;
          return data;
        },
      },
      films: {
        type: new GraphQLList(filmType),
        args: {
          saga: {
            type: StarWarsSaga,
          },
        },
        resolve: async (_, { saga }, { supabase }) => {
          const { data } = await supabase
            .from('film')
            .select('*')
            .filter('saga', 'eq', saga);
          
          return data;
        },
      },
    },
  });