const express = require("express");

const router = express.Router();

const { postController } = require("../../controllers/recruiter");

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createJobPost);

module.exports = router;
