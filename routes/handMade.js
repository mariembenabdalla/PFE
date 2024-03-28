const express = require("express");
const job = require("../models/job");
const handMadeDetails = require("../models/handMadeDetails");
const isAuth = require("../models/handMadeDetails");
const router = express.Router();

module.exports = router;

router.post("/add-project", async (req, res) => {
  try {
    const { user, jobName, project } = req.body;
    const newProject = await handMadeDetails.create({ user, jobName, project });
    res
      .status(201)
      .json({ message: "project Name Created ! ", data: newProject });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/my-details", isAuth, async (req, res) => {
  try {
    const handDetails = await handMadeDetails.find({ user: req.user._id });
    res.status(200).json({ message: "my details ! ", data: handDetails });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// PUT route to add a new project to handMadeDetails
router.put("/handmade/:id/project", async (req, res) => {
  try {
    const handmadeId = req.params.id; // ID of the handMadeDetails document
    const newProject = req.body; // New project data from the request body

    // Find the handMadeDetails document by ID
    const handMade = await handMadeDetails.findById(handmadeId);

    if (!handMade) {
      return res.status(404).json({ message: "HandMade details not found" });
    }

    // Add the new project to the project array
    handMade.project.push(newProject);

    // Save the updated handMadeDetails document
    await handMade.save();

    res.json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
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
