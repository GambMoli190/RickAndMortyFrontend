import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortybackend-production.up.railway.app/graphql",
  }),
  cache: new InMemoryCache(),
});
