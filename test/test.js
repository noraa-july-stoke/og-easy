const {getSiteMetaData} = require('../dist/index')

async function getMeta(url) {
  const response = await getSiteMetaData(url);
  return response;
}

async function printMetaData() {
  const stuff = await getMeta("facebook.com");
  console.log(stuff);
}

printMetaData();

// exports.getSiteMetaData = getSiteMetaData;
