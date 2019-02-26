export const LaunchRocket = {
  rocket: async (obj, args, context) => {
    console.log('obj: ', obj);
    const [data] = await context.db
      .collection('rocket')
      .find({ id: obj.rocket_id })
      .limit(1)
      .toArray();
    return data;
  }
};
