const express = require("express");

const router = express.Router();
const userRoute = require("./user");

const { requireAdmin } = require("../../middlewares/auth");

router.use("/users", userRoute);

module.exports = router;
