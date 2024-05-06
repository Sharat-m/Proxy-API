function validateTravelers(query) {
  //####################### TRAVELLERS ###################################

  var adults = query.adults;
  //   console.log("adults:", adults);
  var childrens = query.childrenAges;
  // var childrenAges = query.childrenAges;
  //   console.log("childrenAges:", childrenAges);
  const childrenAges = Array.isArray(query.childrenAges) ? query.childrenAges : []
  console.log("childrenAges :", childrenAges);
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

  //when the adult is more than 8 and the children age is more than 15 and number of children
  const hasInvalidAge = childrenAges.some((age) => age > 15);
  if (!(adults >= 1 && adults <= 8) && !(totalChildren <= 8) && hasInvalidAge) {
    return {
      code: 3,
      error: true,
      message:
        "The number of adults must be between 1 and 8\nThe maximum number of children is 8\nThe children ages must be between 0 and 15",
    };
  }

  // when both adult and totalchildren is more than 8
  if (!(adults >= 1 && adults <= 8) && !(totalChildren <= 8)) {
    return {
      code: 3,
      error: true,
      message:
        "The number of adults must be between 1 and 8\nThe maximum number of children is 8",
    };
  }

  // when the adult is more than 8 and the children age is more than 15
  if (!(adults >= 1 && adults <= 8) && hasInvalidAge) {
    return {
      code: 3,
      error: true,
      message:
        "The number of adults must be between 1 and 8\nThe children ages must be between 0 and 15",
    };
  }

  // when the children is more than 8 and age is more than 15
  if (!(totalChildren <= 8) && hasInvalidAge) {
    return {
      code: 3,
      error: true,
      message:
        "The maximum number of children is 8\nThe children ages must be between 0 and 15",
    };
  }


  //when only adults is 0 and more than 8
  if (!(adults >= 1 && adults <= 8)) {
    // console.log("Validation failed for adults");
    return {
      code: 3,
      error: true,
      message: "The number of adults must be between 1 and 8",
    };
  }

  //   //when only totalchildren is more than 8
  if (!(totalChildren <= 8)) {
    return {
      code: 3,
      error: true,
      message: "The maximum number of children is 8",
    };
  }

  // when the age of children is more than 15
  // const hasInvalidAge = childrenAges.some((age) => age > 15);
  if (hasInvalidAge) {
    return {
      code: 3,
      error: true,
      message: "The children ages must be between 0 and 15",
    };
  }

  //checking the count of infants and for 1 adult 1 infant
  const totalInfant = childrenAges.filter((age) => age == 1);
  let totalInfants = totalInfant.length;
  // console.log("totalInfants : ", totalInfants);

  if (!(adults >= totalInfants)) {
    return {
      code: 13,
      error: true,
      message: "No successful responses were found for the request",
    };
  }

  // checking the count of child
  let totalchild = childrenAges.filter((age) => age > 1);
  let totalchilds = totalchild.length;
  // console.log("totalchilds : ", totalchilds);
  let totalAdultChild = totalchilds + adults;
  // console.log("totalAdultChild :", totalAdultChild);
  // Total adult and child should be below 10
  if (!(totalAdultChild <= 9)) {
    return {
      code: 3,
      error: true,
      message: "RESULT_STATUS_COMPLETE",
    };
  }

  return { error: false }; // indicating no error
}

module.exports = validateTravelers;
