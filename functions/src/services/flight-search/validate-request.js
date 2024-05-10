const validateMarket = require("./validate-market");

function validateRequest(query) {
    let errorMessage = '';

    //validate market
    const marketResult = validateMarket(query);
    if(marketResult.error){
        errorMessage = errorMessage + marketResult.message;
    }
    return errorMessage ? { error: true, message: errorMessage } : { error: false };
}

module.exports = validateRequest ;