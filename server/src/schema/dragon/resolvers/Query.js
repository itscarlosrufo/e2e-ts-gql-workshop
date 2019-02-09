const { collection } = require('../utils');

const Query = {
  dragons: async (obj, { limit, offset }, context) => {
    const data = await context.db
      .collection(collection)
      .find({})
      .skip(context.offset({ offset }))
      .limit(context.limit({ limit }))
      .toArray();
    return data;
  },
  dragon: async (obj, { id }, context) => {
    const [data] = await context.db
      .collection(collection)
      .find({ id })
      .limit(1)
      .toArray();
    return data;
  }
};

module.exports = {
  Query
};
