const collection = 'mission';
const Query = {
  missions: async (obj, { find, limit, offset }, context) => {
    const data = await context.db
      .collection(collection)
      .find(context.find({ query: { ...find }, collection }))
      .skip(context.offset({ offset }))
      .limit(context.limit({ limit }))
      .map(parseMissions)
      .toArray();
    return data;
  },
  mission: async (obj, { id }, context) => {
    const [data] = await context.db
      .collection(collection)
      .find({ mission_id: id })
      .limit(1)
      .map(parseMissions)
      .toArray();
    return data;
  }
};

const parseMissions = mission => ({
  ...mission,
  id: mission.mission_id,
  name: mission.mission_name
});

module.exports = { Query };
