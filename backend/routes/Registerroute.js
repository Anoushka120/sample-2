
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User =  require('../models/Register');

// POST route for user registration
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Basic validation
  if (
    !firstName ||
    
    !lastName ||
    !email ||
    !password ||
    password !== confirmPassword
  ) {
    return res.status(400).send("Please fill all fields correctly.");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      firstName,
      lastName, 
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();
    res.status(201).send("Registration successful!");
  } catch (error) {
    res.status(500).send("Registration failed. Please try again.");
  }
});

module.exports = router;
