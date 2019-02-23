const collection = 'info';
const Query = {
  company: async (obj, args, context) => {
    const [data] = await context.db
      .collection(collection)
      .find({ name: 'SpaceX' })
      .toArray();
    return data;
  }
};

export default { Query };
