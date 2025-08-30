const express = require("express");
const router = express.Router();
const { addProfile, getProfiles, deleteProfile, updateProfile } = require("../controllers/profileController");

// ROUTES
// add new profile
router.post("/add", addProfile);

// get all profiles
router.get("/", getProfiles);

// delete profile by id
router.delete("/:id", deleteProfile);

// update profile by id
router.put("/:id", updateProfile);

module.exports = router;
