const marketsData = require("../../data/markets.json").markets;

//############ market ####################
function validateMarket(query) {
  const errors = [];
  const marketCode = query.market;
  // console.log("marketCode:", marketCode);
  //checking if market is provided and is not emepty
  if (marketCode === undefined || marketCode === null) {
    errors.push("query.market must not be null");
    errors.push("query.market must not be empty");
  } else if (marketCode.trim() === "") {
    errors.push("query.market must not be empty");
  }

  //checking the market code present in the market json file
  const marketExist = marketsData.some((market) => market.code === marketCode);
  // console.log("marketExist:", marketExist);
  if (marketCode && !marketExist) {
    errors.push("market code is invalid");
  }
  if (errors.length > 0) {
    return { error: true, errors };
}
  return { error: false }; //Indicates the market is valid
}

module.exports = validateMarket;
