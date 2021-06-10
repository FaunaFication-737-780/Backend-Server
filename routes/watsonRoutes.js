const Express = require('express');

let router = Express.Router();
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const discovery = new DiscoveryV1({
  version: '2019-04-30',
  authenticator: new IamAuthenticator({
    //apikey: '--KTG2kQCnkxynw-7P2vmC-BrgSHrIpK08WsY9Ud2QVr',
    apikey: 'GbHklaOq19Y0jgyvhbK2WDT8FVA98K2_3nFHsjwlczrI',
  }),
  //serviceUrl: 'https://api.us-south.discovery.watson.cloud.ibm.com',
  serviceUrl: 'https://api.au-syd.discovery.watson.cloud.ibm.com',
});

// const environmentId = '4e5276ab-e80b-41e7-b16c-91bb2d2693eb'
const environmentId = 'system';
//const collectionId = "a0e7632a-64a4-43d6-aaa6-236a6bce28a3"
const collectionId = 'news-en';

router.get('/', (req, res) => {
  const name = req.query.name;
  //query parameters
  let queryParams = {
    environmentId: environmentId,
    collectionId: collectionId,
    query: name,
  };
  if (name == null || typeof name == 'undefined' || !name) {
    res.status(400).send('Bad request, please including an animal name');
    console.log('error');
  } else {
    console.log(name);
    discovery
      .query(queryParams)
      .then((queryResponse) => {
        console.log(JSON.stringify(queryResponse, null, 2));
        res.send(JSON.stringify(queryResponse, null, 2));
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }
});

//export the file
module.exports = {
  router,
};
