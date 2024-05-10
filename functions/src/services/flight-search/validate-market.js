const marketsData = require("../../data/markets.json").markets;

//############ MARKET ####################
function validateMarket(query) {
  const marketCode = query.market;
  // console.log("marketCode:", marketCode);
  let errors = '';
  if (!marketCode) {
    errors= errors + "The market is missing\n" ;
  }
 if(marketCode == null){
  errors= errors +"The market is invalid\n";
 }
  //checking the market code present in the market json file
  const marketExist = marketsData.some((market) => market.code === marketCode);
//   console.log("marketExist:", marketExist); true or false
  if (!marketExist) {
    errors= errors +"The market is invalid\n" ;
  }

  return errors ? { error: true, message: errors } : { error: false };//Indicates the market is valid
}

module.exports = validateMarket;
