
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Register");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).send("Please provide email and password.");
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found. Please register.");
    }

    // Validate password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect email or password.");
    }

    // If the email and password are correct, user is authenticated
    res.status(200).send("Login successful!");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Login failed. Please try again.");
  }
});

module.exports = router;
