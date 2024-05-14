function validateTravelers(query) {
  //####################### TRAVELLERS ###################################
  let errors = [];
  var adults = query.adults;
  //   console.log("adults:", adults);
  const childrenAges = Array.isArray(query.childrenAges)
    ? query.childrenAges
    : [];
  // console.log("childrenAges :", childrenAges);
  let totalChildren = childrenAges.length;
  //   console.log("totalChildren:", totalChildren);

  //when only adults is 0 and more than 8
  if (!(adults >= 1 && adults <= 8)) {
    errors.push("The number of adults must be between 1 and 8");
  }

  //when only totalchildren is more than 8
  if (!(totalChildren <= 8)) {
    errors.push("The maximum number of children is 8");
  }

  // when the age of children is more than 15
  const hasInvalidAge = childrenAges.some((age) => age > 15);
  // console.log(hasInvalidAge);
  if (hasInvalidAge) {
    errors.push("The children ages must be between 0 and 15");
  }

  //checking the count of infants and for 1 adult 1 infant
  const totalInfant = childrenAges.filter((age) => age == 1);
  let totalInfants = totalInfant.length;
  // console.log("totalInfants : ", totalInfants);
  if (!(adults >= totalInfants)) {
    errors.push("No successful responses were found for the request");
  }


  const message = errors.join("\n");
  if(errors.length > 0) {
    return { error: true, message: message}
  }
  return { error: false }; // Indicating no error
}

module.exports = validateTravelers;
