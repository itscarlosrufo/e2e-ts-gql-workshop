const merge = require('lodash/merge');
const capsule = require('./capsule/resolvers');
const company = require('./company/resolvers');
const core = require('./core/resolvers');
const dragon = require('./dragon/resolvers');
const history = require('./history/resolvers');
const landpad = require('./landpad/resolvers');
const launch = require('./launch/resolvers');
const launchpad = require('./launchpad/resolvers');
const mission = require('./mission/resolvers');
const payload = require('./payload/resolvers');
const roadster = require('./roaster/resolvers');
const rocket = require('./rocket/resolvers');
const ship = require('./ship/resolvers');

const resolvers = merge(
  capsule,
  company,
  core,
  dragon,
  history,
  landpad,
  launch,
  launchpad,
  mission,
  payload,
  roadster,
  rocket,
  ship
);

module.exports = resolvers;
