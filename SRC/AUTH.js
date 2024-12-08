const fs = require("fs");
const path = require("path");
const credPath = path.join(__dirname, "cred.json");

// Read user credentials from the JSON file
const readUsers = () => {
  const data = fs.readFileSync(credPath);
  return JSON.parse(data);
};

// Write updated user credentials back to the JSON file
const writeUsers = (users) => {
  fs.writeFileSync(credPath, JSON.stringify(users, null, 2));
};

// Function to validate login
function validateLogin(username, password, res) {
  const users = readUsers();
  const user = users.find((u) => u.username === username);

  if (user) {
    if (user.password === password) {
      user.isLogedIn = true;
      writeUsers(users);
      return res.json({
        success: true,
        message: "Login successful",
        redirect: "/",
      });
    } else {
      return { success: false, message: "Invalid password" };
    }
  } else {
    return { success: false, message: "User not found" };
  }
}

// Function to register a new user
function registerUser(name, username, password, email) {
  const users = readUsers();
  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return { success: false, message: "Username already exists" };
  }

  const newUser = {
    id: users.length + 1,
    name,
    username,
    password,
    isLogedIn: false,
    Email: email,
    PFP: "",
    Enrolled_courses: [],
  };

  users.push(newUser);
  writeUsers(users); // Save updated user list
  return { success: true, message: "Registration successful" };
}

module.exports = { validateLogin, registerUser };
