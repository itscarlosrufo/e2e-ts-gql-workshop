import { ApolloServer } from 'apollo-server-express';

export default (app, { schema, context }) => {
  const graphql = new ApolloServer({
    schema,
    context
  });

  // graphql api by default
  app.get('/', (_, res) => {
    res.redirect(graphql.graphqlPath);
  });

  graphql.applyMiddleware({
    app
  });
};
