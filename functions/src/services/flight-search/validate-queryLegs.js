// validateQueryLegs.js

const iataData = require("../../data/geo-data.json").places;
const iataCodes = Object.values(iataData).map((place) => place.iata);
const entityCodes = Object.values(iataData).map((place) => place.entityId);

function validateQueryLegs(queryLegs) {
  let errors = [];
   // Check if queryLegs is defined and is an array
   if (!Array.isArray(queryLegs) || queryLegs.length === 0) {
    errors.push("The query leg list must contain at least 1 leg");
    return { error: true, message: errors.join("\n") };
  }
  for (const leg of queryLegs) {
    const originPlaceId = leg.originPlaceId;
    const destinationPlaceId = leg.destinationPlaceId;
    // Iata code
    const originIata = originPlaceId && originPlaceId.iata;
    const destinationIata = destinationPlaceId && destinationPlaceId.iata;
    // Entity Id
    const originEntityId = originPlaceId && originPlaceId.entityId;
    const destinationEntityId =
      destinationPlaceId && destinationPlaceId.entityId;

    // Validate origin IATA
    const checkingOriginIata = iataCodes.includes(originIata); //true
    if (originIata && !checkingOriginIata) {
      errors.push("The QueryPlace ID is not valid IATA"); //  message: "Origin IATA code is invalid",
    }

    // Validate destination IATA
    const checkingDestinationIata = iataCodes.includes(destinationIata); //false
    if (destinationIata && !checkingDestinationIata) {
      errors.push("The QueryPlace ID is not valid IATA"); // message: "Destination IATA code is invalid",
    }

    // Validate origin Entity ID
    const checkingOriginEntityId = entityCodes.includes(originEntityId);
    if (originEntityId && !checkingOriginEntityId) {
      errors.push("The QueryPlace ID is not valid entity ID"); // message: "Origin Entity ID is invalid"
    }

    // Validate destination Entity ID
    const checkingDestinationEntityId =
      entityCodes.includes(destinationEntityId);
    if (destinationEntityId && !checkingDestinationEntityId) {
      errors.push("The QueryPlace ID is not valid entity ID"); // message: "Destination Entity ID is invalid",
    }

    if (!originIata && !originEntityId) {
      errors.push("The QueryPlace ID cannot be null"); // message: "Origin place identifier is missing",
    }

    if (!destinationIata && !destinationEntityId) {
      errors.push("The QueryPlace ID cannot be null"); // message: "Destination place identifier is missing",
    }

    //getting the iata of origin
    let originEntityIdsIata;
    if (originEntityId) {
      const originPlace = iataData[originEntityId];
      // console.log("originPlace:", originPlace);
      if (originPlace) {
        originEntityIdsIata = originPlace.iata;
        // console.log("originEntityIdsIata :", originEntityIdsIata);
      } else {
        console.log("Not found - origin entity ID:", originEntityId);
      }
    } else if (originIata) {
      // Fallback to direct IATA if no entity ID is provided
      originEntityIdsIata = originIata;
      // console.log("Use direct IATA for origin:", originEntityIdsIata);
    }

    let destinationEntityIdsIata;
    if (destinationEntityId) {
      const destPlace = iataData[destinationEntityId];
      if (destPlace) {
        destinationEntityIdsIata = destPlace.iata;
        // console.log("destinationEntityIdsIata :", destinationEntityIdsIata);
      } else {
        console.log("Not found - destination entity ID:", destinationEntityId);
      }
    } else if (destinationIata) {
      // Fallback to direct IATA if no entity ID is provided
      destinationEntityIdsIata = destinationIata;
      // console.log("Use direct IATA for destination:", destinationEntityIdsIata);
    }

    //when both the iata and entity id is same
    // Check if the origin and destination identifiers are the same
    if (originEntityIdsIata === destinationEntityIdsIata) {
      // console.log("Origin and destination cannot be the same");
      errors.push("Origin and destination cannot be the same");
      // message: "RESULT_STATUS_COMPLETE",
      // action: "RESULT_ACTION_OMITTED"
    }
  }
  const message = errors.join("\n");
  if(errors.length > 0) {
    return { error: true, message: message}
  }
  return { error: false }; // Indicating no error
}

module.exports = validateQueryLegs;
