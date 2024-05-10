//############ Limit ####################
function validatelimit(limit) {
  console.log("limit:", limit);
  if (limit < 1) {
    return { error: true, code: 3, message: "limit must be greater than or equal to 1" };
  
  }
  if (limit > 50) {
    return { error: true, code: 3, message: "limit must be less than or equal to 50" };
  
  }
  return { error: false }; //Indicates the limitt is valid
}

module.exports = validatelimit;