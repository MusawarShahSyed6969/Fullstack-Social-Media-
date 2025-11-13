const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  toggleLike,
  addComment
} = require("../controllers/postController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/multer");


router.use(protect); // apply to all routes for now

router.post("/",upload.single("media"), createPost);
router.get("/", getAllPosts);
router.put("/:id/like", toggleLike);
router.post("/:id/comment", addComment);

module.exports = router;
