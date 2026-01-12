import Profile from "../model/Profie.js"

export const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create({ ...req.body, user: req.user._id })
    res.status(201).json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email")
    res.json(profiles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
