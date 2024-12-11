import bcrypt from "bcryptjs";

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/genrateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length >= 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("user logged out");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    
    if (!profilePic) {
      console.error("No profile picture provided");
      return res.status(400).json({ message: "Profile pic is required" });
    }

    console.log("Profile picture received:", profilePic);

    const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    
    console.log("Cloudinary upload response:", uploadedResponse);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const checkAuth=async(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth at auth.controller.js");
    res.status(500).json({ message: "Internal Server Error" });
  }
}