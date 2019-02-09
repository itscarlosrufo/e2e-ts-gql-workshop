const MongoClient = require('mongodb');

const url =
  'mongodb+srv://public:spacex@spacex-gcp-gpg0u.gcp.mongodb.net/spacex-api';

const getDB = async () => {
  const client = await MongoClient.connect(url, {
    poolSize: 20,
    useNewUrlParser: true
  });

  return client.db('spacex-api');
};

module.exports = {
  getDB
};
