const iataData = require("../../data/geo-data.json").places;

const iataCodes = Object.values(iataData).map((place) => place.iata);

//############ IATA ####################
function validateIata(queryLegs) {
  // console.log("queryLegs:", queryLegs);

  for (const leg of queryLegs) {
    // let originPlaceId = leg.originPlaceId.iata;
    // let destinationPlaceId = leg.destinationPlaceId.iata;

    //   // console.log("originPlaceId :", originPlaceId);
    //   // console.log("destinationPlaceId:", destinationPlaceId);
    //   const originIsValid = iataCodes.includes(originPlaceId);
    //   const destinationIsValid = iataCodes.includes(destinationPlaceId);
    //   // console.log("Origin Place ID valid:", originIsValid);
    //   // console.log("Destination Place ID valid:", destinationIsValid);

    const originPlaceId = leg.originPlaceId && leg.originPlaceId.iata;
    const destinationPlaceId = leg.destinationPlaceId && leg.destinationPlaceId.iata;
    // Check if any IATA code is null or undefined
    if (!originPlaceId || !destinationPlaceId) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID cannot be null-iata",
      };
    }

    // Check if IATA codes are valid
    const originIsValid = iataCodes.includes(originPlaceId);
    const destinationIsValid = iataCodes.includes(destinationPlaceId);

    if (!originIsValid || !destinationIsValid) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID is not valid IATA",
      };
    }

    //checking the both iata codes are same or not
    let originPlace = leg.originPlaceId.iata;
    let destinationPlace = leg.destinationPlaceId.iata;
    if (originPlace === destinationPlace) {
      return {
        error: true,
        code: 3,
        message: "RESULT_STATUS_COMPLETE",
        action: "RESULT_ACTION_OMITTED",
      };
    }
  }
  return { error: false }; //Indicates the iata is valid

}

module.exports = validateIata;
