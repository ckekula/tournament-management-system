import { InMemoryCache } from '@apollo/client/core';

const client = {
    uri: 'http://localhost:8088/api/v1/graphql',
    cache: new InMemoryCache(),
    ssrMode: false
};

export default client;