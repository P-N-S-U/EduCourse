const fs = require("fs");
const { Loginstatus } = require("./loginStatus");

function Logout(res) {
  const user = Loginstatus();

  if (user) {
    const data = JSON.parse(fs.readFileSync("SRC/cred.json", "utf-8"));
    const userIndex = data.findIndex((u) => u.username === user.username);

    if (userIndex !== -1) {
      data[userIndex].isLogedIn = false; // Set isLogedIn to false
      fs.writeFileSync("SRC/cred.json", JSON.stringify(data, null, 2), "utf-8");
    }

    res.json({ redirect: "/" });
  } else {
    res.status(400).json({ message: "User not logged in." });
  }
}

module.exports = { Logout };
