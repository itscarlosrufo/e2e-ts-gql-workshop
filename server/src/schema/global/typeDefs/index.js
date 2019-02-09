const { Query } = require('./entryPoints');
const directives = require('./directives');
const scalars = require('./scalars');
const common = require('./common');

const global = [Query, directives, scalars, common];

module.exports = global;
