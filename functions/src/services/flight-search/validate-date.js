function validateDate(queryLegs) {
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  for (const leg of queryLegs) {
    // Validate if year, month, or day are missing
    if (
      !leg.date ||
      leg.date.year == null ||
      leg.date.month == null ||
      leg.date.day == null
    ) {
      if (!leg.date) {
        return {
          error: true,
          code: 3,
          message: "The query leg list contains an invalid or null date",
        };
      }
      //checking the year
      if (leg.date.year == null) {
        return {
          error: true,
          code: 1,
          message: "The date cannot be historical",
        };
      }
      //checking the month and day
      if (leg.date.month == null || leg.date.day == null) {
        return {
          error: true,
          code: 1,
          message: "The query leg list contains an invalid or null date",
        };
      }
    }

    //checking the previous date
    const legDate = new Date(
      `${leg.date.year}-${leg.date.month}-${leg.date.day}`
    );
    if (legDate < todayMidnight) {
      return { error: true, code: 3, message: "The date cannot be historical" };
    }
  }

  // Checking the Departure Date and Return Date
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
      return {
        error: true,
        code: 4,
        message: "The dates of the query legs must be in ascending order",
      };
    }
  }
  return { error: false }; // Indicating no error
}

module.exports = validateDate;
