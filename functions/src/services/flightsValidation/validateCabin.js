function validateCabin(query) {
     //################### CABIN CLASS #################
  const cabinClass = query.cabinClass;
  if (
    ![
      "CABIN_CLASS_ECONOMY",
      "CABIN_CLASS_PREMIUM_ECONOMY",
      "CABIN_CLASS_FIRST_CLASS",
      "CABIN_CLASS_BUSINESS",
    ].includes(cabinClass)
  ) {
    return { error: true, code: 3, message: "The cabinclass  is missing" }
  }
  return { error: false }; //Indicates the cabinclass is valid
}

module.exports = validateCabin;