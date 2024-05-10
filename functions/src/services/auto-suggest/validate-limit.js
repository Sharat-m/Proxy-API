//############ Limit ####################
function validatelimit(limit) {
  const errors = [];
  // console.log("limit:", limit);

  if (limit != undefined) {
    limit = parseInt(limit);
    if (isNaN(limit)) {
      errors.push("Unable to process JSON");
    } else if (limit < 1) {
      errors.push("limit must be greater than or equal to 1");
    } else if (limit > 50) {
      errors.push("limit must be less than or equal to 50");
    } else {
      return { limit };
    }
  } else {
    return { limit: 10 }; //if limit is not specified
  }

  if (errors.length > 0) {
    return { error: true, errors };
  }

  return { error: false }; //Indicates the limitt is valid
}

module.exports = validatelimit;
