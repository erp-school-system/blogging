const Post = require("../models/Post");

const makeSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") + "-" + Date.now();
};

const getPosts = async (req, res) => {
  const isAdminRequest = req.query.admin === "true" && req.user?.role === "admin";
  const query = isAdminRequest ? {} : { status: "published" };
  const posts = await Post.find(query)
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name email");

  if (!post || (post.status !== "published" && req.user?.role !== "admin")) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
};

const createPost = async (req, res) => {
  try {
    const { title, excerpt, content, image, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      slug: makeSlug(title),
      excerpt,
      content,
      image,
      status: status || "published",
      author: req.user._id
    });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.title) {
      updateData.slug = makeSlug(req.body.title);
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post deleted" });
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
