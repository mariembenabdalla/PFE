const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");

const isAuth = require("../middlewares/auth");

router.get("/offers", isAuth, async (req, res) => {
  try {
    const offers = await Offer.find({ client: req.user._id });
    res.status(200).json({ message: "Offres disponibles", data: offers });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route PUT pour mettre à jour le profil du client
router.put("/profile", isAuth, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userImage,
      email,
      password,
      address,
      phoneNumber,
    } = req.body;

    const updatedFields = {
      firstName,
      lastName,
      userImage,
      email,
      password,
      address,
      phoneNumber,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      { new: true }
    );
    res.status(200).json({ message: "Profil mis à jour", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.delete("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProfil = await job.findByIdAndDelete(id);
    res.status(201).json({ message: "profil Name Deleted ! " });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
