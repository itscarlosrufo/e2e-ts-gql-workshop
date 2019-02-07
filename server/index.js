const { ApolloServer, gql } = require('apollo-server')
const { launches } = require('./mocks')

const typeDefs = gql`
  type Query {
    launches: [Launch]
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    name: String
    date: String
    rocket: Rocket
    images: [String]
  }

  type Rocket {
    id: ID!
    name: String
    height: Float
    mass: Float
  }
`

const resolvers = {
  Query: {
    launches: () => launches,
    launch: (obj, args) => launches.find(launch => args.id === launch.id),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
