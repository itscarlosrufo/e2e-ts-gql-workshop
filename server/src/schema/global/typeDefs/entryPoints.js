const gql = require('graphql-tag');

const Query = gql`
  type Query
`;
const Mutation = gql`
  type Mutation
`;
const Subscription = gql`
  type Subscription
`;

module.exports = {
  Query,
  Mutation,
  Subscription
};
