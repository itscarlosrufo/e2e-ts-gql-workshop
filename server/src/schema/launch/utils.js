const collection = 'launch';
const parseLaunch = ({ reuse, flight_number, ...parsedLaunch }) => ({
  ...parsedLaunch,
  id: flight_number
});

module.exports = {
  collection,
  parseLaunch
};
