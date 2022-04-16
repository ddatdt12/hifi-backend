const awardRoute = require('./award');
const jobInterestRoute = require('./jobInterest');
const volunteeringRoute = require('./volunteering');
const workExperienceRoute = require('./workExperience');
const educationRoute = require('./education');

const express = require('express');
const router = express.Router();
const { protectJobSeeker } = require('../../middlewares/auth');
router.use(protectJobSeeker);
router.use('/awards', awardRoute);
router.use('/job-interests', jobInterestRoute);
router.use('/experiences', workExperienceRoute);
router.use('/volunteerings', volunteeringRoute);
router.use('/educations', educationRoute);

module.exports = router;
