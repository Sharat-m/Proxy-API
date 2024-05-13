function validateCabin(query) {
  const cabinClass = query.cabinClass;
  const validCabinClass = [
    "CABIN_CLASS_ECONOMY",
    "CABIN_CLASS_PREMIUM_ECONOMY",
    "CABIN_CLASS_FIRST",
    "CABIN_CLASS_BUSINESS",
  ];
  if (!cabinClass) {
    return {
      error: true,
      code: 3,
      message: "The cabin class is invalid",
    };
  }

  if (!validCabinClass.includes(cabinClass)) {
    return {
      error: true,
      code: 3,
      message: `proto: (line 36:23): invalid value for enum type: "${cabinClass}"`,
    };
  }
  return { error: false }; //Indicates the cabinclass is valid
}

module.exports = validateCabin;
