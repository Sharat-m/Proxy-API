const crypto = require("crypto");
//Genearting the random session token
function generateSessionToken() {
  const buffer = crypto.randomBytes(250); // Generate a random 48-byte binary buffer

  const token = buffer.toString("base64"); // Convert the binary data to a base64 encoded string

  return token.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Replace any '+' and '/' characters to make the string URL-safe
}
// const sessionToken = generateSessionToken();
// console.log('Session Token:', sessionToken);
module.exports = generateSessionToken;
