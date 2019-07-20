const footwears = require("./data/data.json");

async function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

const shoes = Object.freeze(footwears);

module.exports.getShoes = async function getShoes() {
  await sleep(Math.random());

  return shoes;
};
