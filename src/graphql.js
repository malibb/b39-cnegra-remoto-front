import { ApolloClient} from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const API_URL = process.env.LINK_BACK || "http://localhost:4000";

const httpLink = createUploadLink({uri: API_URL});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
      reconnect: true
    }
  });

const authLink = setContext((_, {headers}) => {
    const token = sessionStorage.getItem('blogToken');
    const context = {
        headers: {
            ...headers,
        }
    };
    if(token) context.headers['authorization'] = `JWT ${token}`;
    return context;
});

const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );

export default new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

