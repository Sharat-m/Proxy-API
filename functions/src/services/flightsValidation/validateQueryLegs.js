// validateQueryLegs.js
const validateIata = require("../../services/flightsValidation/validIata");
const validateEntity = require("../../services/flightsValidation/validateEntity");

const iataData = require("../../data/geo-data.json").places;
const iataCodes = Object.values(iataData).map((place) => place.iata);
const entityCodes = Object.values(iataData).map((place) => place.entityId);

function validateQueryLegs(queryLegs) {
  // const usesIata = queryLegs.some(leg => leg.originPlaceId && 'iata' in leg.originPlaceId);
  // const usesEntity = queryLegs.some(leg => leg.originPlaceId && 'entityId' in leg.originPlaceId);

  // if (usesIata && !usesEntity) {
  //     return validateIata(queryLegs);
  // } else if (usesEntity && !usesIata) {
  //     return validateEntity(queryLegs);
  // } else {
  //     return {
  //         error: true,
  //         code: 3,
  //         message: "Invalid query structure: use IATA codes or Entity IDs, not both."
  //     };
  // }

  for (const leg of queryLegs) {
    // leg
    const originPlaceId = leg.originPlaceId;
    console.log("originPlaceId", originPlaceId);
    const destinationPlaceId = leg.destinationPlaceId;
    console.log("destinationPlaceId:", destinationPlaceId);

    // Iata code
    const originIata = originPlaceId && originPlaceId.iata;
    console.log("originIata:", originIata);
    const destinationIata = destinationPlaceId && destinationPlaceId.iata;
    console.log("destinationIata:", destinationIata);
    // Entity Id
    const originEntityId = originPlaceId && originPlaceId.entityId;
    console.log("originEntityId: ", originEntityId);
    const destinationEntityId = destinationPlaceId && destinationPlaceId.entityId;
    console.log("destinationEntityId:", destinationEntityId);

  

    // Validate origin IATA
    const checkingOriginIata = iataCodes.includes(originIata)
    console.log("checkingOriginIata:", checkingOriginIata);
    if (originIata && !checkingOriginIata) {
      return { error: true, code: 3,
        //  message: "Origin IATA code is invalid",
         message: "The QueryPlace ID is not valid IATA",
         };
    }

    // Validate destination IATA
    const checkingDestinationIata = iataCodes.includes(destinationIata);
    console.log("checkingDestinationIata:",checkingDestinationIata);
    if (destinationIata && !checkingDestinationIata) {
      return {
        error: true,
        code: 3,
        // message: "Destination IATA code is invalid",
        message: "The QueryPlace ID is not valid IATA",
      };
    }

    // Validate origin Entity ID
    const checkingOriginEntityId =entityCodes.includes(originEntityId);
    console.log("checkingOriginEntityId:",checkingOriginEntityId);
    if (originEntityId && !checkingOriginEntityId) {
      return { error: true, code: 3, 
        message: "The QueryPlace ID is not valid entity ID" 
        // message: "Origin Entity ID is invalid" 
      };
    }

    // Validate destination Entity ID
    const checkingDestinationEntityId = entityCodes.includes(destinationEntityId)
    console.log("checkingDestinationEntityId:",checkingDestinationEntityId);
    if (destinationEntityId && !checkingDestinationEntityId) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID is not valid entity ID",
        // message: "Destination Entity ID is invalid",
      };
    }

    if (!originIata && !originEntityId) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID cannot be null",
        // message: "Origin place identifier is missing",
      };
    }

    if (!destinationIata && !destinationEntityId) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID cannot be null",
        // message: "Destination place identifier is missing",
      };
    }



  //when both the iata and entity id is same
// Check if the origin and destination identifiers are the same
    if ((originIata && originIata === destinationIata) || (originEntityId && originEntityId === destinationEntityId)) {
      return {
        error: true,
        code: 3,
        message: "Origin and destination cannot be the same",
        action: "RESULT_ACTION_OMITTED"
      };
    }


  }

  return { error: false };
}

module.exports = validateQueryLegs;
