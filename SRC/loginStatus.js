const fs = require("fs");

function Loginstatus() {
  try {
    const data = fs.readFileSync("SRC/cred.json");
    const cred = JSON.parse(data);

    const user = cred.find((user) => user.isLogedIn === true);

    return user ? user : null;
  } catch (error) {
    console.error("Error reading or parsing the file");
    return null;
  }
}

module.exports = { Loginstatus };
