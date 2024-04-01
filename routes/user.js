const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/auth");
const User = require("../models/user");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const nodemailer = require("nodemailer");
const handMadeDetails = require("../models/handMadeDetails");

// Part Added With Me
cloudinary.config({
  cloud_name: "dbcl83rht",
  api_key: "672932442358513",
  api_secret: "-6KmhsPIWFM6AqcW0ozV5pOnE0w",
});
// Multer configuration for file upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/", // Specify the folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "gif", "webp", "mp4"], // Specify the allowed image formats
    public_id: (req, file) => Math.random(), // Generate a unique public ID for each uploaded file
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      res.status(401).json({
        message:
          "your are not authorized to register without submit your Diploma",
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      city,
      town,
      diplome,
      cin,
      phoneNumber,
      address,
      role,
      job,
    } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(409).json({ status: false, message: "Email already Exist !" });
    } else {
      bcrypt.hash(password, 12, async (err, hash) => {
        if (err) {
          res.status(500).json({ status: false, message: err });
        } else if (hash) {
          const user = await User.create({
            firstName,
            lastName,
            email,
            password: hash,
            city,
            town,
            diplome: req.file.path,
            cin,
            phoneNumber,
            address,
            role,
          });
          if (role == "handMade") {
            const newHandMadeDetails = await handMadeDetails.create({
              user: user._id,
              jobName: job,
              project: [],
            });
          }
          res.status(201).json({
            status: true,
            message: `${role} created successfully`,
            data: user,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      if (findUser.authorized) {
        bcrypt.compare(password, findUser.password).then(function (result) {
          if (result == true) {
            jwt.sign(
              {
                username: findUser.username,
                email: findUser.email,
                role: findUser.role,
                _id: findUser._id,
              },
              process.env.SECRETKEY,
              {
                expiresIn: "7d",
              },
              (err, token) => {
                if (err) {
                  console.log(err);
                } else if (token) {
                  res
                    .status(200)
                    .json({ message: "Logged Successfully", data: token });
                }
              }
            );
          } else {
            res.status(404).json({ message: "password wrong ! " });
          }
        });
      } else {
        res.status(401).json({
          message: "Your not Authorized To Sign in Please Contact Support",
        });
      }
    } else {
      res.status(404).json({ message: "Email not Found ! " });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/current", isAuth, (req, res) => {
  if (req.user) {
    res.send({ status: true, msg: "authorized", user: req.user });
  } else {
    res.send({ status: false, msg: "unauthorised" });
  }
});

//part added by me
// Change Password
router.put("/change-password", isAuth, async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ _id: req.user._id });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided old password matches the stored password
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    // Update user's password with the new hashed password
    user.password = hashedNewPassword;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
