const express = require("express");
const job = require("../models/job");
const handMadeDetails = require("../models/handMadeDetails");
const isAuth = require("../middlewares/auth");
const user = require("../models/user");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Offre = require("../models/Offre");
const router = express.Router();

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
    folder: "profile/", // Specify the folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "gif", "webp"], // Specify the allowed image formats
    public_id: (req, file) => Math.random(), // Generate a unique public ID for each uploaded file
  },
});

const upload = multer({ storage: storage });

// Create a new handMade detail with images and videos
router.put(
  "/add-new-project",
  isAuth,
  upload.array(["images", "videos"]),
  async (req, res) => {
    try {
      const { project } = req.body;

      // Filter files based on their fieldname (images or videos)
      const images = [];
      const videos = [];
      req.files.forEach((file) => {
        if (file.fieldname === "images") {
          images.push(file);
        } else if (file.fieldname === "videos") {
          videos.push(file);
        }
      });

      // Upload images to Cloudinary
      const uploadedImages = [];
      for (const image of images) {
        const result = await cloudinary.uploader.upload(
          image.buffer.toString("base64"),
          { resource_type: "image" }
        );
        uploadedImages.push(result.secure_url);
      }

      // Upload videos to Cloudinary
      const uploadedVideos = [];
      for (const video of videos) {
        const result = await cloudinary.uploader.upload(
          video.buffer.toString("base64"),
          { resource_type: "video" }
        );
        uploadedVideos.push(result.secure_url);
      }
      const findUser = await handMadeDetails.findById(req.user._id);
      findUser.project.push({
        ...project,
        images: uploadedImages,
        videos: uploadedVideos,
      });
      const savedHandMadeDetail = await findUser.save();

      res
        .status(201)
        .json({ message: "Project Added ! ", savedHandMadeDetail });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/my-details", isAuth, async (req, res) => {
  try {
    const handDetails = await handMadeDetails.find({ user: req.user._id });
    res.status(200).json({ message: "my details ! ", data: handDetails });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// PUT route to add a new project to handMadeDetails
// Update project details including images and videos
router.put(
  "/:handMadeDetailId/project/:projectId",
  upload.array(["images", "videos"]),
  async (req, res) => {
    try {
      const handMadeDetail = await HandMadeDetails.findById(
        req.params.handMadeDetailId
      );
      if (!handMadeDetail) {
        return res.status(404).json({ message: "HandMade detail not found" });
      }

      // Find the project within handMadeDetail
      const projectIndex = handMadeDetail.project.findIndex(
        (proj) => proj._id.toString() === req.params.projectId
      );
      if (projectIndex === -1) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Handle updating images or videos
      const uploadedImages = [];
      const uploadedVideos = [];
      if (req.files) {
        for (const file of req.files) {
          if (file.fieldname === "images") {
            const result = await cloudinary.uploader.upload(
              file.buffer.toString("base64"),
              { resource_type: "image" }
            );
            uploadedImages.push(result.secure_url);
          } else if (file.fieldname === "videos") {
            const result = await cloudinary.uploader.upload(
              file.buffer.toString("base64"),
              { resource_type: "video" }
            );
            uploadedVideos.push(result.secure_url);
          }
        }
      }

      // Update the project with the new images or videos
      if (uploadedImages.length > 0) {
        handMadeDetail.project[projectIndex].images.push(...uploadedImages);
      }
      if (uploadedVideos.length > 0) {
        handMadeDetail.project[projectIndex].videos.push(...uploadedVideos);
      }

      // Handle updating other project fields (name, description, etc.)
      if (req.body.name) {
        handMadeDetail.project[projectIndex].name = req.body.name;
      }
      if (req.body.description) {
        handMadeDetail.project[projectIndex].description = req.body.description;
      }

      await handMadeDetail.save();
      res.json(handMadeDetail);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// DELETE route to delete a project from handMadeDetails
router.delete("/handmade/:id/project/:projectId", async (req, res) => {
  try {
    const handmadeId = req.params.id; // ID of the handMadeDetails document
    const projectId = req.params.projectId; // ID of the project to delete

    // Find the handMadeDetails document by ID
    const handMade = await handMadeDetails.findById(handmadeId);

    if (!handMade) {
      return res.status(404).json({ message: "HandMade details not found" });
    }

    // Find the index of the project to delete
    const projectIndex = handMade.project.findIndex(
      (project) => project._id.toString() === projectId
    );

    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the project from the project array
    handMade.project.splice(projectIndex, 1);

    // Save the updated handMadeDetails document
    await handMade.save();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(
  "/update-handMade-profile",
  upload.single("image"),
  isAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const image = req.file;

      if (image) {
        const updateProfile = await user.findByIdAndUpdate(userId, {
          ...req.body,
          userImage: req.file.path,
        });
        res.status(201).json({ message: "user updated", updateProfile });
      } else {
        const updateProfile = await user.findByIdAndUpdate(userId, {
          ...req.body,
        });
        res.status(201).json({ message: "user updated", updateProfile });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  }
);
// Update offer status
router.put("/:offerId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOffer = await Offre.findByIdAndUpdate(
      req.params.offerId,
      { status },
      { new: true }
    );
    res.status(200).json({ message: "offer updated", updatedOffer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get offers by handMade
router.get("/handMade-offers", isAuth, async (req, res) => {
  try {
    const offers = await Offre.find({ handMade: req.user._id });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
