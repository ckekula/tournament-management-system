import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = {
    uri: 'http://localhost:8088/api/v1/graphql',
    cache: new InMemoryCache(),
};

export default client;