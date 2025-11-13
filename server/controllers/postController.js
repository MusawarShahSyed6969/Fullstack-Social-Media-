const fs = require('fs');
const cloudinary = require('../configs/cloudinary'); // make sure you export cloudinary.v2
const Post = require('../models/postModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    let media = { public_id: '', url: '' };

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'MERN_socialmedia_posts',
    });

    media = {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    };

    // Safely delete local file (don’t crash if it’s already gone)
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.warn('Temp file cleanup failed:', err.message);
    }

    // Save post to DB
    const post = await Post.create({
      user: req.user._id, // assumes JWT middleware sets req.user
      caption,
      media,
    });

    return res.status(201).json({ success: true, post });
  } catch (err) {
    console.error('Error creating post:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating post',
    });
  }
};

// Get all posts (feed)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username name avatar")
      .populate("comments.user", "username name avatar")
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Like or unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(req.user._id);

    if (liked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ success: true, liked: !liked, likesCount: post.likes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error toggling like" });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user._id,
      text
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ success: true, comment });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error adding comment" });
  }
};
