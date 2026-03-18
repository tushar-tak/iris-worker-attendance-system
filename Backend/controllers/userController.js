const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: "User saved successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
};