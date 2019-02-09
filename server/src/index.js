const { ApolloServer } = require('apollo-server');
const { getDB } = require('./context/db');
const schema = require('./schema');
const ctx = require('./context');

(async () => {
  const db = await getDB();

  const context = { ...ctx, db };

  const server = new ApolloServer({
    schema,
    context
  });

  server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
})();
