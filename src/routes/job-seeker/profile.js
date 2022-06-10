const express = require('express');

const router = express.Router();

const postController = require('../../controllers/job-seeker/postController');
const { protectJobSeeker } = require('../../middlewares/auth');

router.post(
	'/:id/favorite/add',
	protectJobSeeker,
	postController.addFavoritePost
);
router.delete(
	'/:id/favorite/delete',
	protectJobSeeker,
	postController.deleteFavoritePost
);
router.get(
	'/:idUser/favorite-posts',
	protectJobSeeker,
	postController.getFavoritePosts
);

module.exports = router;
