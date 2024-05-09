// function validateDate(queryLegs) {
//   //   console.log("Received query legs:", JSON.stringify(queryLegs));

//   if (!queryLegs) {
//     console.log("Query legs are undefined or null");
//     return { error: true, code: 1, message: "Query legs are undefined" };
//   }

//   if (queryLegs.length === 0) {
//     console.log("Query legs array is empty");
//     return { error: true, code: 1, message: "Query legs array is empty" };
//   }

//   if (!queryLegs[0].date) {
//     console.log("Date object is missing in the first query leg");
//     return {
//       error: true,
//       code: 1,
//       message: "The query leg list contains an invalid or null date",
//     };
//   }

//   if (
//     !queryLegs[0].date.year ||
//     !queryLegs[0].date.month ||
//     !queryLegs[0].date.day
//   ) {
//     console.log(
//       "Date object in the first query leg is incomplete:",
//       JSON.stringify(queryLegs[0].date)
//     );
//     return {
//       error: true,
//       code: 1,
//       message: "The query leg list contains an invalid or null date",
//     };
//   }
//   //############ DATE VALIDATION ####################
//   const departureDate = new Date(`${queryLegs[0].date.year}-${queryLegs[0].date.month}-${queryLegs[0].date.day}`);

//   if (isNaN(departureDate)) {
//     console.log("Departure date is invalid:", JSON.stringify(queryLegs[0].date));
//     return { error: true, code: 1, message: "Invalid departure date" };
//   }

//   let returnDate;
//   if (queryLegs.length > 1 && queryLegs[1].date) {
//     returnDate = new Date(`${queryLegs[1].date.year}-${queryLegs[1].date.month}-${queryLegs[1].date.day}`);
//     if (isNaN(returnDate)) {
//       console.log("Return date is invalid:", JSON.stringify(queryLegs[1].date));
//       return { error: true, code: 1, message: "Invalid return date" };
//     }
//   }

//   //Date validation
//   const todayMidnight = new Date( new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
//   todayMidnight.setHours(0, 0, 0);
//   const currentDate = todayMidnight.getTime();
//   const userDepartureDate = new Date(new Date(departureDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata", })).getTime();
//   const userReturnDate = new Date(new Date(returnDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getTime();

//   //Checking the Date is previous or not
//   if (userDepartureDate < currentDate || userReturnDate < currentDate) {
//     return { error: true, code: 3, message: "The date cannot be historical" };
//   }
//   return { error: false }; // Indicating no error
// }

// module.exports = validateDate;
// function validateDate(queryLegs) {

//   const departureDate = new Date(`${queryLegs[0].date.year}-${queryLegs[0].date.month}-${queryLegs[0].date.day}`);

//     if (isNaN(departureDate)) {
//       // console.log("Departure date is invalid:", JSON.stringify(queryLegs[0].date));
//       return { error: true, code: 1, message: "Invalid departure date" };
//     }

//     let returnDate;
//       if (queryLegs.length > 1 && queryLegs[1].date) {
//         returnDate = new Date(`${queryLegs[1].date.year}-${queryLegs[1].date.month}-${queryLegs[1].date.day}`);
//         if (isNaN(returnDate)) {
//           console.log("Return date is invalid:", JSON.stringify(queryLegs[1].date));
//           return { error: true, code: 1, message: "Invalid return date" };
//         }
//       }

//   //Date validation
//   const todayMidnight = new Date( new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
//   todayMidnight.setHours(0, 0, 0);
//   const currentDate = todayMidnight.getTime();
//   const userDepartureDate = new Date(new Date(departureDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata", })).getTime();
//   const userReturnDate = new Date(new Date(returnDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getTime();

//   //Checking the Date is previous or not
//   if (userDepartureDate < currentDate || userReturnDate < currentDate) {
//     return { error: true, code: 3, message: "The date cannot be historical" };
//   }

//   const allDatesValid = queryLegs.every(leg => {
//     if (!leg.date || !leg.date.year || !leg.date.month || !leg.date.day) {
//       return false;
//     }
//     const legDate = new Date(`${leg.date.year}-${leg.date.month}-${leg.date.day}`);
//     if (isNaN(legDate)) {
//       return false;
//     }
//     return legDate >= todayMidnight;
//   });

//   if (!allDatesValid) {
//     return { error: true, code: 3, message: "The query leg list contains an invalid or null date" };
//   }

//   return { error: false }; // Indicating no error
// }

// module.exports = validateDate;

// function validateDate(queryLegs) {
//   if (!queryLegs || queryLegs.length === 0) {
//     return { error: true, code: 1, message: "Query legs are undefined or empty" };
//   }

//   const dates = [];
//   const todayMidnight = new Date();
//   todayMidnight.setHours(0, 0, 0, 0); // Set time to midnight today.

//   for (const leg of queryLegs) {
//     if (!leg.date || !leg.date.year || !leg.date.month || !leg.date.day) {
//       return { error: true, code: 3, message: "The query leg list contains an invalid or null date" };
//     }

//     const legDate = new Date(`${leg.date.year}-${leg.date.month}-${leg.date.day}`);
//     if (isNaN(legDate)) {
//       return { error: true, code: 1, message: "Invalid date format in query legs" };
//     }

//     if (legDate < todayMidnight) {
//       return { error: true, code: 3, message: "The date cannot be historical" };
//     }

//     dates.push(legDate);
//   }

//   // Check that each subsequent date is later than the previous
//   for (let i = 1; i < dates.length; i++) {
//     if (dates[i] <= dates[i - 1]) {
//       return { error: true, code: 4, message: "The dates of the query legs must be in ascending order" };
//     }
//   }

//   return { error: false }; // Indicating no error
// }

// module.exports = validateDate;

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
