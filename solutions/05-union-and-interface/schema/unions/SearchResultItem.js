import graphql from 'graphql';
const {
    GraphQLUnionType,
} = graphql;

const resolveType = (data) => {
    if (data.username) {
      return UserType;
    }
    if (data.director) {
      return MovieType;
    }
    if (data.author) {
      return BookType;
    }
  };
  
const SearchResultItem = new GraphQLUnionType({
    name: 'SearchResultItem',
    types: [],
    resolveType: resolveType
  });