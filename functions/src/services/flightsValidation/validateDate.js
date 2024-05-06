function validateDate(queryLegs) {
    //   console.log("Received query legs:", JSON.stringify(queryLegs));

      if (!queryLegs) {
        console.log("Query legs are undefined or null");
        return { error: true, code: 1, message: "Query legs are undefined" };
    }

    if (queryLegs.length === 0) {
        console.log("Query legs array is empty");
        return { error: true, code: 1, message: "Query legs array is empty" };
    }

    if (!queryLegs[0].date) {
        console.log("Date object is missing in the first query leg");
        return { error: true, code: 1, message: "Date data is missing in the first query leg" };
    }

    if (!queryLegs[0].date.year || !queryLegs[0].date.month || !queryLegs[0].date.day) {
        console.log("Date object in the first query leg is incomplete:", JSON.stringify(queryLegs[0].date));
        return { error: true, code: 1, message: "Incomplete date data in the first query leg" };
    }
  //############ DATE VALIDATION ####################
  const departureDate = queryLegs[0].date
    ? new Date(
        `${queryLegs[0].date.year}-${queryLegs[0].date.month}-${queryLegs[0].date.day}`
      )
    : null;
  const returnDate = queryLegs[1].date
    ? new Date(
        `${queryLegs[1].date.year}-${queryLegs[1].date.month}-${queryLegs[1].date.day}`
      )
    : null;
  //   console.log("Date :", query && query.queryLegs && query.queryLegs[0] && query.queryLegs[0].date);
  //   console.log("New Date :", new Date( `${query.queryLegs[0].date.year}-${query.queryLegs[0].date.month}-${query.queryLegs[0].date.day}` ));
  // console.log("departureDate :", departureDate);
  // console.log("returnDate :", returnDate);

  if (!departureDate) {
    return { error: true, code: 3, message: "The  missing or invalid date" }
  }
  // Only check return date if there is a second leg
  if (queryLegs.length > 1 && !returnDate) {
    return { error: true, code: 3, message: "Return date is missing or invalid" };
  }

  //date validation
  const todayMidnight = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  todayMidnight.setHours(0, 0, 0);
  const currentDate = todayMidnight.getTime();
  const userDepartureDate = new Date(
    new Date(departureDate).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  ).getTime();
  const userReturnDate = new Date(
    new Date(returnDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  ).getTime();
  //Checking the Date
  if (userDepartureDate < currentDate || userReturnDate < currentDate) {
    // console.log("userDepartureDate :", userDepartureDate);
    // console.log("currentDate :", currentDate);
    return { error: true, code: 3, message: "The date cannot be historical" }
   
  }
  return { error: false }; // indicating no error
}
module.exports = validateDate ;