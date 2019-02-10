import { ApolloServer } from 'apollo-server';
import { getDB } from './context/db';
import schema from './schema';
import ctx from './context';

(async () => {
  const db = await getDB();

  const context = { ...ctx, db };

  const server = new ApolloServer({
    schema,
    context
  });

  server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
})();
