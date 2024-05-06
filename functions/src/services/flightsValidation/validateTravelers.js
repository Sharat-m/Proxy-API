function validateTravelers(query) {
  //####################### TRAVELLERS ###################################

  var adults = query.adults;
//   console.log("adults:", adults);
  var childrens = query.childrenAges;
  var childrenAges = query.childrenAges;
//   console.log("childrenAges:", childrenAges);
  let totalChildren = childrenAges.length;
//   console.log("totalChildren:", totalChildren);
  var totalTravelers = adults + totalChildren;
//   console.log("totalTravelers :", totalTravelers);
  // const infants = query.childrenAges.filter((age) => age === 1);

  // console.log("childrenAge:",childrenAge);
  // You can use these arrays as needed, for example:
  // console.log(
  //   `There are ${infants.length} infants and ${children.length} children.`
  // );

  // when both adult and totalchildren is more than 8
  if (!(adults >= 1 && adults <= 8) && !(totalChildren <= 8)) {
    return {
      error: true,
      code: 3,
      message:
        "The number of adults must be between 1 and 8\nThe maximum number of children is 8",
      details: [],
    };
  }

  //when only adults is 0 and more than 8
  if (!(adults >= 1 && adults <= 8)) {
    console.log("Validation failed for adults");
    return {
      error: true,
      code: 3,
      message: "The number of adults must be between 1 and 8",
      details: [],
    };
  }

  //   //when only totalchildren is more than 8
  if (!(totalChildren <= 8)) {
    return {
      error: true,
      code: 3,
      message: "The maximum number of children is 8",
      details: [],
    };
  }

  // when the age of children is more than 15
  const hasInvalidAge = childrenAges.some((age) => age > 15);
  if (hasInvalidAge) {
    return {
      error: true,
      code: 3,
      message: "The children ages must be between 0 and 15",
      details: [],
    };
  }

  //checking the count of infants and for 1 adult 1 infant
  const totalInfant = childrenAges.filter((age) => age == 1);
  let totalInfants = totalInfant.length;
  // console.log("totalInfants : ", totalInfants);

  if (!(adults >= totalInfants)) {
    return {
      error: true,
      code: 13,
      message:
        "No successful responses were found for the request-Each infant must be accompanied by at least one adult",
      details: [],
    };
  }

  // checking the count of child
  let totalchild = childrenAges.filter((age) => age > 1);
  let totalchilds = totalchild.length;
  // console.log("totalchilds : ", totalchilds);
  let totalAdultChild = totalchilds + adults;
  // console.log("totalAdultChild :", totalAdultChild);

  if (!(totalAdultChild <= 9)) {
    return {
      error: true,
      code: 3,
      message:
        "RESULT_STATUS_COMPLETE - Total adult and child should be below 10",
      details: [],
    };
  }

  return { error: false }; // indicating no error
}

module.exports = validateTravelers;
