const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  const token = jwt.sign({ user }, "JWTSECRET", {
    expiresIn: "3d",
  });
  return token;
};

module.exports = {
  signUp: async (req, res) => {
    const { name, username, email, password, picture } = req.body;
    try {
      const newUser = new User({
        name,
        username,
        email,
        password,
        picture,
      });

      const savedUser = await newUser.save();
      const token = generateToken(savedUser);
      res.status(200).json({ token, user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  signIn: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = generateToken(user);
      res.status(200).json({ token, user, message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
