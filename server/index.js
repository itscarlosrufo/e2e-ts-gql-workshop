const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const launches = [
  {
    id: "74",
    mission_name: "Iridium NEXT Mission 8",
    details: `SpaceX's first flight of 2019 will be the eighth and final launch of its planned Iridium flights. Delivering 10 satellites to low earth orbit, this brings the total up to 75 and completes the Iridium NEXT constellation. This mission launches from SLC-4E at Vandenberg AFB. The booster is expected to land on JRTI.`,
    links: {
      flickr_images: [
        "https://farm5.staticflickr.com/4866/39745612523_14270b4b9d_o.jpg"
      ]
    },
    rocket: {
      rocket_name: "Falcon 9"
    }
  },
  {
    id: "73",
    mission_name: "GPS III SV01",
    details: `SpaceX's twenty-first flight of 2018 launched the first of the new GPS III satellites (Block IIIA) for the United States Air Force and was SpaceX's first EELV mission. The spacecraft was delivered to a MEO transfer orbit from SLC-40 at Cape Canaveral Air Force Station. This mission was the first to fly with the redesigned COPV on the first stage (B1054) as well as the second. The booster was expended.`,
    links: {
      flickr_images: [
        "https://farm5.staticflickr.com/4864/45715171884_f1dd88c058_o.jpg"
      ]
    },
    rocket: {
      rocket_name: "Falcon 9"
    }
  },
  {
    id: "72",
    mission_name: "CRS-16",
    details: `SpaceX's 16th Crew Resupply Mission on behalf of NASA, with a total of 20 contracted flights. This will bring essential supplies to the International Space Station using SpaceX's reusable Dragon spacecraft. The Falcon 9 will launch from SLC-40 at Cape Canaveral Air Force Station. During the landing of the first stage, a grid fin hydraulic pump stalled, causing the core to enter an uncontrolled roll, and resulting in a (succesful) water landing.`,
    links: {
      flickr_images: [
        "https://farm5.staticflickr.com/4835/45473442624_69ee8bee45_o.jpg"
      ]
    },
    rocket: {
      rocket_name: "Falcon 9"
    }
  },
  {
    id: "71",
    mission_name: "SSO-A",
    details: `SpaceX's nineteenth flight of 2018 will fly SSO-A: SmallSat Express out of Vandenberg SLC-4E for Spaceflight. SSO-A is a rideshare to sun synchronus low earth orbit consisting of 64 individual microsatellites and cubesats. It is also likely to be the third flight of core B1046 which previously flew Bangabandhu-1 and Merah Putih. If this happens it will be the first time a Falcon 9 has flown more than two missions. `,
    links: {
      flickr_images: [
        "https://farm5.staticflickr.com/4875/45257565145_d53757e0b2_o.jpg"
      ]
    },
    rocket: {
      rocket_name: "Falcon 9"
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
    mission_name: String!
    details: String
    links: LaunchLinks
    rocket: LaunchRocket
  }
  type LaunchLinks {
    flickr_images: [String]
  }
  type LaunchRocket {
    rocket_name: String!
  }
`;

const resolvers = {
  Query: {
    launches: (obj, args, context) => launches,
    launch: (obj, args, context) =>
      launches.find(launch => args.id === launch.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at: ${url}`));
