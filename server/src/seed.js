require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Post = require("./models/Post");

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Post.deleteMany({});

  const adminPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: adminPassword,
    role: "admin"
  });

  await User.create({
    name: "Demo User",
    email: "user@example.com",
    password: await bcrypt.hash("User@123", 10),
    role: "user"
  });

  await Post.create([
    {
      title: "First Blog Post",
      slug: "first-blog-post",
      excerpt: "This is the first blog post excerpt.",
      content: "This is the full content of the first blog post. You can edit this from admin panel.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      status: "published",
      author: admin._id
    },
    {
      title: "Second Blog Post",
      slug: "second-blog-post",
      excerpt: "This is the second blog post excerpt.",
      content: "This is the full content of the second blog post. Ads are integrated on frontend.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      status: "published",
      author: admin._id
    }
  ]);

  console.log("Seed completed");
  console.log("Admin email: admin@example.com");
  console.log("Admin password: Admin@123");
  process.exit();
};

seed();
