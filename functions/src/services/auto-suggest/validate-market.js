const marketsData = require("../../data/markets.json").markets;

//############ MARKET ####################
function validateMarket(query) {
  const marketCode = query.market;

  //checking the market code present in the market json file
  const marketExist = marketsData.some((market) => market.code === marketCode);
  //   console.log("marketExist:", marketExist); true or false
  if (!marketExist) {
    return { error: true, code: 3, message: "The market is invalid" };
  }

  
  // console.log("marketCode:", marketCode);
  if (!marketCode) {
    return { error: true, code: 3, message: "The market is missing" };
  }

  return { error: false }; //Indicates the market is valid
}

module.exports = validateMarket;
