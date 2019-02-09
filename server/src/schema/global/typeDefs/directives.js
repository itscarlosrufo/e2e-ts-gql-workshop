const gql = require('graphql-tag');

const directives = gql`
  directive @rateLimit(
    max: Int
    window: String
    message: String
    identityArgs: [String]
  ) on FIELD_DEFINITION
`;

module.exports = directives;
