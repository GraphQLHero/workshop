import { GraphQLObjectType, GraphQLList } from 'graphql';
// import humanType from './Human';
import planetType from './Planet';
import filmType from './Film';
// import HumanOrder from '../inputs/HumanOrder';
import DiameterFilter from '../inputs/DiameterFilter';
import StarWarsSaga from '../enums/StarWarsSaga';
import characterInterface from '../interfaces/Character';
import CharacterOrder from '../inputs/CharacterOrder';
// import HumanGender from '../enums/HumanGender';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    // humans: {
    //   type: new GraphQLList(humanType),
    //   args: {
    //     orderBy: {
    //       type: HumanOrder,
    //       defaultValue: { field: 'name', direction: 'ASC' }
    //     },
    //     gender: {
    //       type: HumanGender
    //     }
    //   },
    //   resolve: async (_, { orderBy, gender }, { database }) => {
    //     const query = database
    //       .from('human')
    //       .select('*')
    //       .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });

    //     if (gender) {
    //       query.filter('gender', 'eq', gender);
    //     }

    //     const { data } = await query;
    //     return data;
    //   }
    // },
    characters: {
      type: new GraphQLList(characterInterface),
      args: {
        orderBy: {
          type: CharacterOrder,
          defaultValue: { field: 'id', direction: 'ASC' }
        },
      },
      resolve: async (_, { orderBy }, { database }) => {
        const query = database
          .from('human')
          .select('*')
          .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });

        const { data } = await query;
        return data;
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
