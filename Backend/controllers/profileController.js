const Profile = require("../models/Profile");

// Add new profile
const addProfile = async (req, res) => {
  try {
    const { fullName, mobileNumber, email } = req.body;
    const newProfile = new Profile({ fullName, mobileNumber, email });
    const savedProfile = await newProfile.save();
    res.status(201).json({ message: "Profile saved successfully", profile: savedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete profile by ID
const deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile by ID
const updateProfile = async (req, res) => {
  try {
    const { fullName, mobileNumber, email } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { fullName, mobileNumber, email },
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addProfile, getProfiles, deleteProfile, updateProfile };
