
const iataData = require ("../../data/geo-data.json").places;

const iataCodes = Object.values(iataData).map(place => place.iata);
// console.log("iataCodes:", iataCodes);
//############ IATA ####################
function validateIata(queryLegs) {
//   const iataCode = query.market;
//   console.log("iataCode:", iataCode);
// console.log("queryLegs:", queryLegs);

for (const leg of queryLegs){
 let  originPlaceId = leg.originPlaceId.iata
 let destinationPlaceId = leg.destinationPlaceId.iata

console.log("originPlaceId :", originPlaceId);
console.log("destinationPlaceId:" , destinationPlaceId);

const originIsValid = iataCodes.includes(originPlaceId);
const destinationIsValid = iataCodes.includes(destinationPlaceId);

console.log("Origin Place ID valid:", originIsValid);
console.log("Destination Place ID valid:", destinationIsValid);

if (originPlaceId == null) {
    return { error: true, code: 3, message: "The QueryPlace ID cannot be null" };
  }
if (!originPlaceId) {
    return { error: true, code: 3, message: "The QueryPlace ID is not valid IATA" };
  }


  if (destinationPlaceId == null) {
    return { error: true, code: 3, message: "The QueryPlace ID cannot be null" };
  }

  if (!destinationPlaceId) {
    return { error: true, code: 3, message: "The QueryPlace ID is not valid IATA" };
  }
  
  if (!(originIsValid && destinationIsValid)) {
    return { error: true, code: 3, message: "The QueryPlace ID is not valid IATA" };
 }


}


 

  return { error: false }; //Indicates the iata is valid
}

module.exports = validateIata;