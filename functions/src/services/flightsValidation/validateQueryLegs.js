// validateQueryLegs.js
const validateIata = require('../../services/flightsValidation/validIata');
const validateEntity = require('../../services/flightsValidation/validateEntity');

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
        // console.log("originPlaceId", originPlaceId);
        const destinationPlaceId = leg.destinationPlaceId;
        console.log("destinationPlaceId:", destinationPlaceId);
    
       // Iata code
        const originIata = originPlaceId && originPlaceId.iata;
        const destinationIata = destinationPlaceId && destinationPlaceId.iata;
       // Entity Id
        const originEntityId = originPlaceId && originPlaceId.entityId;
        const destinationEntityId = destinationPlaceId && destinationPlaceId.entityId;
    
        // Validate origin IATA
        if (originIata && !iataCodes.includes(originIata)) {
          return { error: true, code: 3, message: "Origin IATA code is invalid" };
        }
    
        // Validate destination IATA
        if (destinationIata && !iataCodes.includes(destinationIata)) {
          return { error: true, code: 3, message: "Destination IATA code is invalid" };
        }
    
        // Validate origin Entity ID
        if (originEntityId && !entityCodes.includes(originEntityId)) {
          return { error: true, code: 3, message: "Origin Entity ID is invalid" };
        }
    
        // Validate destination Entity ID
        if (destinationEntityId && !entityCodes.includes(destinationEntityId)) {
          return { error: true, code: 3, message: "Destination Entity ID is invalid" };
        }
    
        if (!originIata && !originEntityId) {
          return { error: true, code: 3, message: "Origin place identifier is missing" };
        }
    
        if (!destinationIata && !destinationEntityId) {
          return { error: true, code: 3, message: "Destination place identifier is missing" };
        }
      }

      return { error: false };

}

module.exports = validateQueryLegs;
