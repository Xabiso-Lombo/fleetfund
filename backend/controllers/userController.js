import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isInvestor: user.isInvestor },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isInvestor: user.isInvestor,
      investmentInterest: user.investmentInterest
    }
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, phone, isInvestor, investmentInterest } = req.body;
  const safeName = typeof name === "string" ? name.trim() : "";
  const safeEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!safeName || !safeEmail || !password || !phone) {
    return res.status(400).json({ message: "Name, email, phone, and password are required" });
  }

  if (!safeEmail.includes("@")) {
    return res.status(400).json({ message: "Enter a valid email" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const existing = await User.findOne({ email: safeEmail });
  if (existing) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const user = await User.create({ 
    name: safeName, 
    email: safeEmail, 
    password, 
    phone, 
    isInvestor: !!isInvestor, 
    investmentInterest 
  });

  const token = generateToken(user);

  return res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isInvestor: user.isInvestor,
      investmentInterest: user.investmentInterest
    }
  });
};
