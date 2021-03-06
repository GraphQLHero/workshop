import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import planetType from './Planet';
import filmType from './Film';
import DiameterFilter from '../inputs/DiameterFilter';
import StarWarsSaga from '../enums/StarWarsSaga';
import characterInterface from '../interfaces/Character';
import CharacterOrder from '../inputs/CharacterOrder';
import SearchResultItem from '../unions/SearchResultItem';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: new GraphQLList(characterInterface),
      args: {
        orderBy: {
          type: CharacterOrder,
          defaultValue: { field: 'id', direction: 'ASC' }
        }
      },
      resolve: async (_, { orderBy }, { database }) => {
        const query = database
          .from('character')
          .select('human_id(*),droid_id(*),wookie_id(*)')
          .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });
        const { data } = await query;
        return data.map(
          (o: { human_id: Object; droid_id: Object; wookie_id: Object }) =>
            o.human_id || o.droid_id || o.wookie_id
        );
      }
    },
    search: {
      type: new GraphQLNonNull(new GraphQLList(SearchResultItem)),
      args: {
        query: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (_, { query }, { database }) => {
        const { data: humans } = await database
          .from('human')
          .select('*')
          .textSearch('name', query, { type: 'websearch', config: 'english' });

        const { data: planets } = await database
          .from('planet')
          .select('*')
          .textSearch('name', query, { type: 'websearch', config: 'english' });

        const { data: films } = await database
          .from('film')
          .select('*')
          .textSearch('title', query, { type: 'websearch', config: 'english' });

        return [...humans, ...planets, ...films];
      }
    },
    planets: {
      type: new GraphQLList(planetType),
      args: {
        diameter: {
          type: DiameterFilter
        }
      },
      resolve: async (_, { diameter }, { database }) => {
        const query = database.from('planet').select('*');

        if (diameter) {
          const { min, max } = diameter;
          query.gte('diameter', min).lte('diameter', max);
        }

        const { data, error } = await query;
        if (error) {
          console.error(error);
        }
        return data;
      }
    },
    films: {
      type: new GraphQLList(filmType),
      args: {
        saga: {
          type: StarWarsSaga
        }
      },
      resolve: async (_, { saga }, { database }) => {
        const { data } = await database
          .from('film')
          .select('*')
          .filter('saga', 'eq', saga);
        return data;
      }
    }
  }
});
