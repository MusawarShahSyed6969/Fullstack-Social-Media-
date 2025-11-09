const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  toggleLike,
  addComment
} = require("../controllers/postController");

// Temporary auth middleware (replace later with real JWT middleware)
const mockAuth = (req, res, next) => {
  req.user = { _id: "672fbc1234abcd56789ef000" }; // fake user id
  next();
};

router.use(mockAuth); // apply to all routes for now

router.post("/", createPost);
router.get("/", getAllPosts);
router.put("/:id/like", toggleLike);
router.post("/:id/comment", addComment);

module.exports = router;
