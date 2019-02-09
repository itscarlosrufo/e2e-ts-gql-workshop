const gql = require('graphql-tag');

const scalars = gql`
  scalar Date
  scalar ObjectID
`;

module.exports = scalars;
