const express = require('express');

const router = express.Router();

const postController = require('../../controllers/job-seeker/postController');

router.route('/:id/favorite/add').post(postController.addFavoritePost);
router.route('/:id/favorite/delete').delete(postController.deleteFavoritePost);
router.route('/:idUser/favorite-posts').get(postController.getFavoritePosts);

module.exports = router;
