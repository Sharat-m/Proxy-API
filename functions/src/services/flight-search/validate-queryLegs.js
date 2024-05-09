// validateQueryLegs.js
const validateIata = require("./validate-iata");
const validateEntity = require("./validate-entity");

const iataData = require("../../data/geo-data.json").places;
const iataCodes = Object.values(iataData).map((place) => place.iata);
const entityCodes = Object.values(iataData).map((place) => place.entityId);

function validateQueryLegs(queryLegs) {
  for (const leg of queryLegs) {
    const originPlaceId = leg.originPlaceId;
    // console.log("originPlaceId", originPlaceId); //originPlaceId { iata: 'IXE' }
    const destinationPlaceId = leg.destinationPlaceId;
    // console.log("destinationPlaceId:", destinationPlaceId); //destinationPlaceId: { entityId: '128668563' }

    // Iata code
    const originIata = originPlaceId && originPlaceId.iata;
    // console.log("originIata:", originIata); // IXE
    const destinationIata = destinationPlaceId && destinationPlaceId.iata;
    // console.log("destinationIata:", destinationIata); //undefined
    // Entity Id
    const originEntityId = originPlaceId && originPlaceId.entityId;
    // console.log("originEntityId: ", originEntityId); //undefined
    const destinationEntityId =
      destinationPlaceId && destinationPlaceId.entityId;
    // console.log("destinationEntityId:", destinationEntityId); // 128668563

    // Validate origin IATA
    const checkingOriginIata = iataCodes.includes(originIata);
    // console.log("checkingOriginIata:", checkingOriginIata); //true
    if (originIata && !checkingOriginIata) {
      return {
        error: true,
        code: 3,
        //  message: "Origin IATA code is invalid",
        message: "The QueryPlace ID is not valid IATA",
      };
    }

    // Validate destination IATA
    const checkingDestinationIata = iataCodes.includes(destinationIata);
    // console.log("checkingDestinationIata:", checkingDestinationIata); //false
    if (destinationIata && !checkingDestinationIata) {
      return {
        error: true,
        code: 3,
        // message: "Destination IATA code is invalid",
        message: "The QueryPlace ID is not valid IATA",
      };
    }

    // Validate origin Entity ID
    const checkingOriginEntityId = entityCodes.includes(originEntityId);
    // console.log("checkingOriginEntityId:", checkingOriginEntityId);
    if (originEntityId && !checkingOriginEntityId) {
      return {
        error: true,
        code: 3,
        message: "The QueryPlace ID is not valid entity ID",
        // message: "Origin Entity ID is invalid"
      };
    }

    // Validate destination Entity ID
    const checkingDestinationEntityId =
      entityCodes.includes(destinationEntityId);
    // console.log("checkingDestinationEntityId:", checkingDestinationEntityId);
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
      return {
        error: true,
        code: 3,
        message: "RESULT_STATUS_COMPLETE",
        action: "RESULT_ACTION_OMITTED",
      };
    }
  }

  return { error: false };
}

module.exports = validateQueryLegs;
