const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const launches = [
  {
    id: '74',
    name: 'Iridium NEXT Mission 8',
    details: `SpaceX's first flight of 2019 will be the eighth and final launch of its planned Iridium flights. Delivering 10 satellites to low earth orbit, this brings the total up to 75 and completes the Iridium NEXT constellation. This mission launches from SLC-4E at Vandenberg AFB. The booster is expected to land on JRTI.`,
    image: 'https://farm5.staticflickr.com/4866/39745612523_14270b4b9d_o.jpg',
    rocket: {
      id: 'falcon9',
      name: 'Falcon 9'
    },
    ship: {
      id: 'JRTI-2',
      name: 'Just Read The Instructions',
      port: 'Port of Los Angeles',
      image: 'https://i.imgur.com/7VMC0Gn.jpg'
    }
  },
  {
    id: '73',
    name: 'GPS III SV01',
    details: `SpaceX's twenty-first flight of 2018 launched the first of the new GPS III satellites (Block IIIA) for the United States Air Force and was SpaceX's first EELV mission. The spacecraft was delivered to a MEO transfer orbit from SLC-40 at Cape Canaveral Air Force Station. This mission was the first to fly with the redesigned COPV on the first stage (B1054) as well as the second. The booster was expended.`,
    image: 'https://farm5.staticflickr.com/4864/45715171884_f1dd88c058_o.jpg',
    rocket: {
      id: 'falcon9',
      name: 'Falcon 9'
    },
    ship: null
  },
  {
    id: '72',
    name: 'CRS-16',
    details: `SpaceX's 16th Crew Resupply Mission on behalf of NASA, with a total of 20 contracted flights. This will bring essential supplies to the International Space Station using SpaceX's reusable Dragon spacecraft. The Falcon 9 will launch from SLC-40 at Cape Canaveral Air Force Station. During the landing of the first stage, a grid fin hydraulic pump stalled, causing the core to enter an uncontrolled roll, and resulting in a (succesful) water landing.`,
    image: 'https://farm5.staticflickr.com/4835/45473442624_69ee8bee45_o.jpg',
    rocket: {
      id: 'falcon9',
      name: 'Falcon 9'
    },
    ship: {
      id: 'GOQUEST',
      name: 'GO Quest',
      port: 'Port Canaveral',
      image: 'https://i.imgur.com/ABXtHKa.jpg'
    }
  },
  {
    id: '71',
    name: 'SSO-A',
    details: `SpaceX's nineteenth flight of 2018 will fly SSO-A: SmallSat Express out of Vandenberg SLC-4E for Spaceflight. SSO-A is a rideshare to sun synchronus low earth orbit consisting of 64 individual microsatellites and cubesats. It is also likely to be the third flight of core B1046 which previously flew Bangabandhu-1 and Merah Putih. If this happens it will be the first time a Falcon 9 has flown more than two missions. `,
    image: 'https://farm5.staticflickr.com/4875/45257565145_d53757e0b2_o.jpg',
    rocket: {
      id: 'falcon9',
      name: 'Falcon 9'
    },
    ship: {
      id: 'JRTI-2',
      name: 'Just Read The Instructions',
      port: 'Port of Los Angeles',
      image: 'https://i.imgur.com/7VMC0Gn.jpg'
    }
  }
];
const typeDefs = gql`
  type Query {
    launches: [Launch]
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    name: String
    details: String
    image: String
    rocket: Rocket
    ship: Ship
  }

  type Rocket {
    id: ID!
    name: String
  }

  type Ship {
    id: ID!
    name: String
    port: String
    image: String
  }
`;

const resolvers = {
  Query: {
    launches: () => launches,
    launch: (obj, { id }) => launches.find(launch => id === launch.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.log('🚀 Server listening on url: ' + url));
