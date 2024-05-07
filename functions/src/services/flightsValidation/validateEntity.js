const entityData = require("../../data/geo-data.json").places;

const entityCodes = Object.values(entityData).map((place) => place.entityId);
console.log(entityCodes);
//############ IATA ####################
function validateEntity(queryLegs) {
  // console.log("queryLegs:", queryLegs);

  for (const leg of queryLegs) {
    // let originEnityId = leg.originEnityId.iata;
    // let destinationEntityId = leg.destinationEntityId.iata;

    //   // console.log("originEnityId :", originEnityId);
    //   // console.log("destinationEntityId:", destinationEntityId);
    //   const originEntityIsValid = iataCodes.includes(originEnityId);
    //   const destinationEntityIsValid = iataCodes.includes(destinationEntityId);
    //   // console.log("Origin Place ID valid:", originEntityIsValid);
    //   // console.log("Destination Place ID valid:", destinationEntityIsValid);

    const originEnityId = leg.originPlaceId && leg.originPlaceId.entityId;
    // console.log("originEnityId:", originEnityId);
    const destinationEntityId =
      leg.destinationPlaceId && leg.destinationPlaceId.entityId;
    // console.log("destinationEntityId:" , destinationEntityId);
    // Check if any IATA code is null or undefined
    if (!originEnityId || !destinationEntityId) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID cannot be null- entity",
      };
    }

    // Check if IATA codes are valid
    const originEntityIsValid = entityCodes
      .map((code) => code.toLowerCase())
      .includes(originEnityId.toLowerCase());
    console.log("originEntityIsValid:", originEntityIsValid);
    const destinationEntityIsValid = entityCodes
      .map((code) => code.toLowerCase())
      .includes(destinationEntityId.toLowerCase());
    console.log("destinationEntityIsValid:", destinationEntityIsValid);

    if (!originEntityIsValid || !destinationEntityIsValid) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID is not valid Entity",
      };
    }

    //checking the both iata codes are same or not
    let originPlace = leg.originPlaceId.entityId;
    console.log(originPlace);
    let destinationPlace = leg.destinationPlaceId.entityId;
    console.log(destinationPlace);
    if (originPlace == destinationPlace) {
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

module.exports = validateEntity;
