const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Loginstatus } = require("./SRC/loginStatus");
const { validateLogin, registerUser } = require("./SRC/AUTH");
const { Logout } = require("./SRC/Logout");

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "landing-page.html"));
});

app.get("/isLogedIn", (req, res) => {
  const user = Loginstatus();
  res.json(user);
});

//for login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = validateLogin(username, password, res);

  if (result.success) {
    res.json({ redirect: result.redirect });
  } else {
    res.status(400).json(result);
  }
});

//for logout
app.post("/logout", (req, res) => {
  Logout(res);
});

app.post("/register", (req, res) => {
  const { name, username, password, email } = req.body;
  const result = registerUser(name, username, password, email);
  res.json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
