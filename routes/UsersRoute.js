const express = require('express');
const router = express.Router();
const controller = require('../controllers/UsersController');

router.get("/:id", controller.getUser);
router.post("/", controller.postUser);
router.patch("/:id",controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;