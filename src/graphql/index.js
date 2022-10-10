import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      authorization: `Bearer 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`,
    },
  };
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
