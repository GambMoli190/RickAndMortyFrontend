import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://rickandmortybackend-production.up.railway.app/graphql", // tu endpoint
  cache: new InMemoryCache(),
});
