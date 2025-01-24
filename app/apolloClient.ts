import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}/graphql`, // Cambia la URL según tu backend
  cache: new InMemoryCache(),
});

export default client;