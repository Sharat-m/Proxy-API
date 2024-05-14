//JSON file reader
const fs = require("fs").promises;
//Fuction is used to read the JSOn file
async function fsReadFileToJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error reading file:", error);
    throw error;
  }
}

module.exports = { fsReadFileToJSON };
