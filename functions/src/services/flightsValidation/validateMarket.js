 //############ MARKET ####################
 function validateMarket(query) {
 
 const market = query.market;
 if (!market) {
  return { error: true, code: 3, message: "The market is missing" }
 }
 return { error: false }; //Indicates the market is valid
}


module.exports = validateMarket;