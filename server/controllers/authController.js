import User from "../models/user.js";

// User Registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists in the system" });
    }

    // Create a new user with plain text password
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Return success response without the password
    res.status(201).json({ 
      success: true, 
      user: { name, email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by their email
    const user = await User.findOne({ email });

    // Validate if the user exists and if the password matches (no encryption)
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return success response with user details
    res.status(200).json({ 
      success: true, 
      user: { name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};