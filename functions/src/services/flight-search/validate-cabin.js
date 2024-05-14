// ################## Validate cabinclass #################
function validateCabin(query) {
  const cabinClass = query.cabinClass;
  let errors = [] ;
  const validCabinClass = [
    "CABIN_CLASS_ECONOMY",
    "CABIN_CLASS_PREMIUM_ECONOMY",
    "CABIN_CLASS_FIRST",
    "CABIN_CLASS_BUSINESS",
  ];
  if (!cabinClass) {
  errors.push( "The cabin class is invalid");
  } else if (!validCabinClass.includes(cabinClass)) {
      errors.push(`proto: (line 36:23): invalid value for enum type: "${cabinClass}"`);
  }

  //Returning the errors if any  have been collected
  const message = errors.join("\n");
  if(errors.length > 0) {
    return { error: true, message: message}
  }
  return { error: false }; // Indicating no error
}

module.exports = validateCabin;
