const User = require("../models/users");

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
      res.json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  signIn: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Check if user with the provided username exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validate password
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // User login successful
      res.json({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
