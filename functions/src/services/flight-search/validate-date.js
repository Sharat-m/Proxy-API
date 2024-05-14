function validateDate(queryLegs) {
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  let errors = [];
 // Check if queryLegs is defined and is an array
 if (!Array.isArray(queryLegs) || queryLegs.length === 0) {
  errors.push("The query leg list must contain at least 1 leg");
  return { error: true, message: errors.join("\n") };
}
  for (const leg of queryLegs) {
    // Validate if year, month, or day are missing
      if (!leg.date) {
        errors.push("The query leg list contains an invalid or null date");
      continue; 
      }
      //checking the year
      if (leg.date.year == null) {
       errors.push("The date cannot be historical");
       continue
      }
      //checking the month and day
      if (leg.date.month == null || leg.date.day == null) {
       errors.push( "The query leg list contains an invalid or null date");
     continue;
      }
    
    //checking the previous date
    const legDate = new Date(leg.date.year,leg.date.month - 1,leg.date.day)
    if (legDate < todayMidnight) {
       errors.push("The date cannot be historical");
    }
  }

  // Checking the dates are in ascending order
  for (let i = 1; i < queryLegs.length; i++) {
    const returnDate = new Date(
      `${queryLegs[i].date.year}-${queryLegs[i].date.month}-${queryLegs[i].date.day}`
    );
    const departureDate = new Date(
      `${queryLegs[i - 1].date.year}-${queryLegs[i - 1].date.month}-${
        queryLegs[i - 1].date.day
      }`
    );
    if (returnDate < departureDate) {
      errors.push("The dates of the query legs must be in ascending order");
    }
  }
  const message = errors.join("\n");
  if(errors.length > 0) {
    return { error: true, message: message}
  }
  return { error: false }; // Indicating no error
}

module.exports = validateDate;
