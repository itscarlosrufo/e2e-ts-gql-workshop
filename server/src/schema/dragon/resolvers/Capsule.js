const { collection } = require('../utils');

const Capsule = {
  dragon: async ({ capsule_id }, args, context) => {
    const [data] = await context.db
      .collection(collection)
      .find({ id: capsule_id })
      .limit(1)
      .toArray();
    return data;
  }
};

module.exports = {
  Capsule
};
