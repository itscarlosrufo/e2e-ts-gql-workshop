# 👨‍💻 End-to-end Type-Safe GraphQL Workshop

<p align="center">
<a href="https://github.com/swcarlosrj/e2e-ts-gql-workshop/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
<a href="https://github.com/swcarlosrj/e2e-ts-gql-workshop/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>  
<a href="https://spectrum.chat/e2e-ts-gql-workshop"><img src="https://withspectrum.github.io/badge/badge.svg"></a>
</p>

Get introduced to the marvellous GraphQL universe! Discover all t`he benefits for adding End-to-end Type-Safety to your GraphQL App taking all the advantages of TypeScriot, GraphQL & React working together. Apollo, auto-gen Types & Hooks would build the pillars of a SpaceX demo 🛰

# 🎯 Goals

- Understand Why, How & What's GraphQL
- Create a J/TS GraphQL Server
- Create a J/TS GraphQL Client
- Contribute with Open Source

# 🗓 Agenda

**🚀 Server**

- S0: JS GraphQL Server Demo
- S1: JS GraphQL Server
- S2: TS GraphQL Server

**🌖 Client**

- S0: JS REST Client
- S1: JS GraphQL Client
- S2: TS GraphQL Client

# 🛠 Requirements

**👍 Essentials**

- [Node](https://nodejs.org/en/). Latest LTS Version (10.15.3).
- [Git](https://git-scm.com/downloads). Latest LTS Version (2.21.0).
- [Github](https://github.com/). You just need to create an account!

**🤙 Nice to have**

- [VSCode](https://code.visualstudio.com/). The futuristic J/TS IDE!
- [CodeCopy](https://github.com/zenorocha/codecopy). Copy to clipboard on markdown.

---

# 🌏 Intro

Open a terminal

Fork and clone this repository

```
git clone https://github.com/${👩‍💻👨‍💻}/e2e-ts-gql-workshop
```

Navigate to the created folder

```
cd e2e-ts-gql-workshop
```

---

# 🚀 Server

Time -0, it'll be time to liftoff creating (from scratch) a GraphQL Server. TypeDefs, resolvers & context will be the boosters of the GraphQL JS implementation. Then, we'll take all the advantages of having a strongly typed GraphQL Schema to auto-generate the TypeScript types based on our GraphQL type definitions!

## Summary

- S0: JS GraphQL Server Demo
- S1: JS GraphQL Server
- S2: TS GraphQL Server

## Step 0️⃣ JS GraphQL Server Demo

In this step will create a demo JS GraphQL Server based on mock data!
Summary

- Create folder structure
- Implement JS GraphQL Server
- Run Server

### 📦 Create folder structure

👉 Checkout first step

```
git checkout server-step-0
```

👍 Create server folder

```
mkdir server
```

👌 Create index.js inside the server folder

```
cd server
touch index.js
```

### 🎮 Implement JS GraphQL Server

Let's implement a demo GraphQL server in our `index.js`

👉 Declare typeDefs

```javascript
const typeDefs = gql`
  # Entry Points
  type Query {
    launches: [Launch]
    launch(id: Int!): Launch
  }

  # Types
  type Launch {
    flight_number: Int!
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
```

👉 Declare resolvers

```javascript
const resolvers = {
  Query: {
    launches: (obj, args, context) => launches,
    launch: (obj, args, context) =>
      launches.find(launch => args.id === launch.flight_number)
  }
};
```

👉 Declare server

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers
});
```

👉 Call server

```javascript
server.listen().then(({ url }) => console.log(`🚀 Server ready at: ${url}`));
```

👍 Import [mock data](https://gist.github.com/swcarlosrj/0893f6a55055819943346bb719d3a34b)

```javascript
const launches = [...]
```

👌 Add dependencies

```javascript
const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
```

### ⚡️ Run Server

👉 Install dependencies

```
npm install graphql apollo-server
```

👍 Run server

```
node ./index.js
```

👌 Explore GraphQL API [http://localhost:4000/](http://localhost:4000/)

Well done 💪, commit your changes and let's get our hands dirty!

## Step 1️⃣ JS GraphQL Server

In this step we will connect the server with a database and we will implement an underfecthing solution

### Summary

- Explore the DB
- Create DB connector
- Adapt server & resolvers
- Underfetching implementation

### 🧐 Explore the DB

Let's discover how to access to SpaceX real data 🔎

👉 Open [Humongous](https://www.humongous.io/)

👉 Login on `Get Started` and choose your fav MongoDB hosting provider

👉 Paste the SpaceX Public DB link

```
mongodb+srv://public:spacex@spacex-gcp-gpg0u.gcp.mongodb.net/spacex-api
```

👍 Click Next & Create Project

👌 Explore all the data collections

### 🕹 Create DB connector

Now, we are gonna get rid of the mocks to use real data 🔥

👉 Create `db.js` file

```
touch db.js
```

👉 Connect to DB

```javascript
const url =
  "mongodb+srv://public:spacex@spacex-gcp-gpg0u.gcp.mongodb.net/spacex-api";

const getDB = async () => {
  const client = await MongoClient.connect(url, {
    poolSize: 20,
    useNewUrlParser: true
  });

  return client.db("spacex-api");
};

module.exports = {
  getDB
};
```

👍 Add `mongodb` dependendy

```javascript
const MongoClient = require("mongodb");
```

👌 Install `mongodb` dependency

```
npm install mongodb
```

### 💫 Adapt server & resolvers

👉 Adapt our server on `index.js` replacing the current definition with:

```javascript
(async () => {
  const db = await getDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db }
  });

  server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
})();
```

👉 Import the DB

```javascript
const { getDB } = require("./db");
```

👉 Implement resolvers replacing the current with:

```javascript
const resolvers = {
  Query: {
    launches: async (obj, args, context) => {
      const data = await context.db
        .collection("launch")
        .find()
        .limit(10)
        .toArray();
      return data;
    },
    launch: async (obj, { flight_number }, context) => {
      const [data] = await context.db
        .collection("launch")
        .find({ flight_number })
        .limit(1)
        .toArray();
      return data;
    }
  }
};
```

👉 Remove launches on `index.js`

👍 Run server

```
node ./index.js
```

👌 Explore explore **real data** through the GraphQL API _(refresh your browser)_ [http://localhost:4000/](http://localhost:4000/)

### ♻️ Underfetching implementation

👉 Add `rocket` to LaunchRocket

```graphql
type LaunchRocket {
  rocket_name: String!
  rocket: Rocket
}
```

👉 Include the `Rocket` type

```graphql
type Rocket {
  id: ID!
  name: String
  description: String
  cost_per_launch: Int
}
```

👍 Add the `LaunchRocket` resolver

```javascript
const resolvers = {
  Query: {...},
  LaunchRocket: {
    rocket: async (obj, args, context) => {
      console.log("obj: ", obj);
      const [data] = await context.db
        .collection("rocket")
        .find({ id: obj.rocket_id })
        .limit(1)
        .toArray();
      return data;
    }
  }
}
```

👌 Run the server & explore real data _(refresh your browser)_

```
node ./index.js
```

_Look 👀 what you're getting on `obj` when asking for `launches { rocket { rocket { ... } } }` (don't forget to remove the console.log)_

**2/3 ✅**, creating APIs has never been easier, commit your changes and let's move on to the last step!

## Step 2️⃣ TS GraphQL Server

In this step will auto-generate TypeScript types based on our GraphQL implementation to make our API type safe

### Sumary
- Explore API & Codebase
- Evolve the API
- Generate TS types
- Evolve Safely the API

### 🤔 Explore API & Codebase

👉 Checkout

```
git checkout server-step-2
```

👉 Install dependencies & run the server

```
cd server
npm install
npm start
```

👉 Explore the API
[http://localhost:4000](http://localhost:4000)

👍 Explore the codebase

👌 Try to understand how this query is being resolved

```graphql
{
  history(id: 17) {
    title
    flight {
      mission_name
      rocket {
        rocket {
          name
          cost_per_launch
        }
      }
    }
  }
}
```

### 🎸 Evolve the API

👍 Add to Rocket typeDefs `rocketByName`

```javascript
extend type Query {
  ...
  rocketByName(name: String!): Rocket
}
```

👌 Add it resolver

```javascript
rocketByName: async (obj, { name }, context) => {
  const [data] = await context.db
    .collection(collection)
    .find({ name })
    .limit(1)
    .toArray();
  return data;
};
```

👍 Run server

```
node ./index.js
```

👌 Explore GraphQL API testing the new evolution _(refresh your browser)_ [http://localhost:4000/](http://localhost:4000/)

If everything went well, commit your changes!

### 🎶 Generate TS types

👉 Checkout

```
git checkout server-step-3
```

👉 Install dependencies & run the server

```
npm install
npm run dev
```

👉 Create `codegen.yml` file

```
touch codegen.yml
```

👉 Include the configuration

```
schema: src/schema/**/*.ts
overwrite: true
watch: true
require:
  - ts-node/register
generates:
  ./src/types/types.d.ts:
    config:
      contextType: ./context#MyContext
    plugins:
      - typescript-common
      - typescript-server
      - typescript-resolvers
```

Indentation here is crucial!

👉 Install `codegen` dependencies

```
npm install graphql-code-generator@0.16.0 graphql-codegen-typescript-common@0.16.0 graphql-codegen-typescript-resolvers@0.16.0 graphql-codegen-typescript-server@0.16.0
```

👉 Install dependencies

```
npm install
```

👍 Open a terminal and run

```
npm run dev
```

👌 Explore the API
[http://localhost:4000](http://localhost:4000)

👍 Open another terminal and run

```
npm run generate
```

👌 Explore `types/types.d.ts` file

Commit your changes and let's wrap this up!

### 🎻 Evolve Safely the API

👉 Add again `rocketByName` into the Rocket typeDefs

```graphql
  extend type Query {
    ...
    rocketByName(name: String!): Rocket
  }
```

👉 Explore the `types/types.d.ts` file changes

👉 Add again it resolver

```javascript
rocketByNome: async (obj, { nome }, context) => {
  const [data] = await context.db
    .collection(collection)
    .find({ nome })
    .limit(1)
    .toArray();
  return data;
};
```

👉 Type your `rocket`'s resolvers

```javascript
const Query: QueryResolvers.Resolvers = {
  ...
}
```

👍 Import the `QueryResolvers` type definitions

```
import { QueryResolvers } from "../../types/types";
```

👌 Fix all the erros that you could find with the help of TypeScript!

## Step 👽 Create a REST API based on GraphQL

👉 Checkout

```
git checkout server-step-5
```

👉 Install dependencies & run the server

```
npm install
npm run dev
```

👍 Explore the GraphQL API
[http://localhost:4000/graphql](http://localhost:4000/graphql)
🤙 Explore the REST API
[http://localhost:4000/rest](http://localhost:4000/rest)

👌 Explore the codebase
Take a look at the `servers` folder, excluding that folder eveything is same than last step!

<h2 align="center">
  GraphQL 💜 REST
</h2>

# 🎉 You're just finished all GraphQL Server steps, let's now learn about GraphQL Clients!

---

# 🌖 Client

Approaching landing... we will create a React-Apollo client in JS (using hooks, of course). Later on we will evolve it safely generating the TypeScript types from our GraphQL documents!

## Summary

- S0: JS REST Client
- S1: JS GraphQL Client
- S2: TS GraphQL Client

## Step 0️⃣ JS REST Client

### Summary
- Create folder structure
- Setup Suspense
- Fetch data from REST

### 📦 Create folder structure

👉 Checkout first step

```
git checkout client-step-0
```

👍 Install create-react-app

```
npm install --global create-react-app
```

👌 Create client folder

```
create-react-app client
```

### ⭐️ Setup Suspense

👉 Add `Suspense` into your `index.js` ReactDom.render:

```javascript
ReactDOM.render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  document.getElementById("root")
);
```

👉 Import `Suspense`:

```javascript
import React, { Suspense } from "react";
```

### 💫 Fetch data from REST

👉 Change your `App` component as follow:

```javascript
function App() {
  const launchesPast = useFetch("https://api.spacex.land/rest/launches-past");
  return (
    <React.Fragment>
      {launchesPast.map(({ mission_name, details, links, rocket }) => (
        <div key={String(mission_name)}>
          <h3>
            🛰 {mission_name} 🚀 {rocket.name}
          </h3>
          <p>{details}</p>
          <img src={links.flickr_images[0]} width="200" />
        </div>
      ))}
    </React.Fragment>
  );
}
```

👉 Import `useFetch`

```javascript
import useFetch from "fetch-suspense";
```

👉 Install `fetch-suspense`

```
cd client
npm install fetch-suspense
```

👍 Install dependencies & run the client

```
npm install
npm start
```

👌 Explore the Client [http://localhost:3000](http://localhost:3000)

## Step 1️⃣ JS GraphQL Client

### Summary
- Setup GraphQL Client
- Fetch data from GraphQL

### 🌟 Setup GraphQL Client

👉 Create on `index.js` a new Apollo Client

```javascript
const client = new ApolloClient({
  uri: "http://api.spacex.land/graphql"
});
```

👉 Include `ApolloProvider`

```javascript
ReactDOM.render(
  <ApolloProvider client={client}>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </ApolloProvider>,
  document.getElementById("root")
);
```

👍 Import dependencies

```javascript
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
```

👌 Install dependencies

```
npm install react-apollo-hooks apollo-boost graphql
```

## ⚡️ Fetch data from GraphQL

👉 Write on 'App.js' the GraphQL query

```javascript
const query = gql`
  query getLaunches {
    launchesPast {
      mission_name
      details
      links {
        flickr_images
      }
      rocket {
        name: rocket_name
      }
    }
  }
`;
```

👉 Add `useQuery` to fetch data from the GraphQL API

```javascript
const launchesPastRest = useFetch("https://api.spacex.land/rest/launches-past");
const {
  data: { launchesPast = [] }
} = useQuery(query);
```

👉 Import `useQuery`

```javascript
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
```

👉 Run the client again

```
npm start
```

👍 Explore the Client [http://localhost:3000](http://localhost:3000)

👌 Open your browser inspector tool and give a 👀 to both size & time GraphQL-REST calls!

Commit your changes! It's time to finish the workshop off 💪

## Step 2️⃣ TS GraphQL Client

### Summary
- Evolve the Client
- Generate TS types
- Evolve Safely the Client

### 🎸 Evolve the Client

👉 Checkout last step

```
git checkout client-step-2
```

👉 Include `launch_success` field into our query

```javascript
const query = gql`
  query getLaunches {
    launchesPast {
      mission_name
      details
      links {
        flickr_images
      }
      rocket {
        name: rocket_name
      }
      launch_success
    }
  }
`;
```

👉 Remove `useFetch` call and log the `query` to verify that `launch_success` is there

```javascript
function App() {
  // const launchesPast = useFetch("https://api.spacex.land/rest/launches-past");
  const {
    data: { launchesPast }
  } = useQuery(query);

  console.log("launchesPast", launchesPast)

  return (...);
}
```

👍 Display `launch_success`

```javascript
function App() {
  const {
    data: { launchesPast = [] }
  } = useQuery(query);
  return (
    <React.Fragment>
      {launchesPast.map(
        ({ mission_name, details, links, rocket, launch_success }) => (
          <div key={String(mission_name)}>
            <h3>
              🛰 {mission_name} 🚀 {rocket.
              }
            </h3>
            <p>{details}</p>
            <h3>Success: {launch_success ? "✅" : "❌"}</h3>
            <img src={links.flickr_images[0]} width="200" />
          </div>
        )
      )}
    </React.Fragment>
  );
}
```

👌 Explore the Client to see the new field [http://localhost:3000](http://localhost:3000)

### 🎶 Generate TS types

👉 Create `codegen.yml` file

```
touch codegen.yml
```

👉 Include the configuration

```
schema: https://api.spacex.land/graphql
documents:
  - src/**/*.tsx
overwrite: true
watch: true
generates:
  ./src/types/types.d.ts:
    plugins:
      - typescript-common
      - typescript-client
```

👉 Install `codegen` dependencies

```
npm install graphql-code-generator@0.16.0 graphql-codegen-typescript-common@0.16.0 graphql-codegen-typescript-client@0.16.0
```

👉 Install dependencies

```
npm install
```

👍 Open a terminal and run

```
npm start
```

👌 Explore the Client
[http://localhost:3000](http://localhost:3000)

👍 Open another terminal and run

```
npm run generate
```

👌 Explore `types/types.d.ts` file

Fantastic, we are almost done. Don't forget to commit the changes!

### 🎻 Evolve Safely the Client

👉 Type your returned data

```typescript
const {
  data: { launchesPast }
} = useQuery<GetLaunches.Query>(query);
```

👉 Import `GetLaunches` type definition

```javascript
import { GetLaunches } from "../types";
```

👍 Add the `ships` field to the query

```javascript
const query = gql`
  query getLaunches {
    launchesPast {
      # ...
      ships {
        id
        name
        port: home_port
        image
      }
    }
  }
`;
```

👌 Display the `ships` with the help of TypeScript auto-completion!

```javascript
return (
  <React.Fragment>
    {launchesPast.map(
      ({ ..., ships }) => (
          // ...
          {ships.map(({ id, name, port, image }) => (
            <div key={id}>
              <h3>
                ⛴ {name} 🌊 {port}
              </h3>
              <img src={image} alt="" width={200} />
            </div>
          ))}
        </div>
      )
    )}
  </React.Fragment>
);
```

## Step 👽 Introspect API from the IDE

👉 Install [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) VS Code extension

👍 Create `apollo.config.js` file:

```javascript
module.exports = {
  client: {
    service: {
      url: "https://api.spacex.land/graphql"
    }
  }
};
```

👌 Press `Ctrl + Space Bar` inside your query 🤯

# 🎊 You're just finished all GraphQL Client steps, hoping that you've enjoyed & learned something new!

# 😄 Thanks for coming

Don't hesitate to contact [@swcarlosrj](https://twitter.com/swcarlosrj) if you'd have any question!
