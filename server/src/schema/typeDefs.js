const global = require('./global/typeDefs');
const capsule = require('./capsule/typeDefs');
const company = require('./company/typeDefs');
const core = require('./core/typeDefs');
const dragon = require('./dragon/typeDefs');
const history = require('./history/typeDefs');
const landpad = require('./landpad/typeDefs');
const launch = require('./launch/typeDefs');
const launchpad = require('./launchpad/typeDefs');
const mission = require('./mission/typeDefs');
const roadster = require('./roaster/typeDefs');
const rocket = require('./rocket/typeDefs');
const ship = require('./ship/typeDefs');
const payload = require('./payload/typeDefs');

const typeDefs = [
  ...global,
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
];

module.exports = typeDefs;
