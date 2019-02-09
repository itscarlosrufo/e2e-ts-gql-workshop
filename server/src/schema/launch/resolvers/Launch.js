const { collection, parseShips } = require('../../ship/utils');

const Launch = {
  ships: async ({ ships }, args, context) => {
    return ships.map(async ship_id => {
      const [data] = await context.db
        .collection(collection)
        .find({ ship_id })
        .limit(1)
        .map(parseShips)
        .toArray();

      return data;
    });
  }
};

module.exports = {
  Launch
};
