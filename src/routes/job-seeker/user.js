const express = require('express');
const router = express.Router();
const { protectJobSeeker } = require('../../middlewares/auth');

const awardRoute = require('./award');
const jobInterestRoute = require('./jobInterest');
const volunteeringRoute = require('./volunteering');
const workExperienceRoute = require('./workExperience');
const educationRoute = require('./education');
const applicationRoute = require('./application');
const skillRoute = require('./skill');
const { updateMe } = require('../../controllers/job-seeker/userController');

router.use(protectJobSeeker);
router.put('/', updateMe);

router.use('/awards', awardRoute);
router.use('/job-interests', jobInterestRoute);
router.use('/experiences', workExperienceRoute);
router.use('/volunteerings', volunteeringRoute);
router.use('/educations', educationRoute);
router.use('/applications', applicationRoute);
router.use('/skills', skillRoute);

module.exports = router;
