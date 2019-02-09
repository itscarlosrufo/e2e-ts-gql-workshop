const collection = 'launchpad';

const parseLaunchpad = pad => {
  pad.name = pad.full_name;
  const { padid, full_name, ...padParsed } = pad;
  return padParsed;
};

module.exports = {
  collection,
  parseLaunchpad
};
