import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  status: "published"
};

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadPosts = async () => {
    const res = await api.get("/posts?admin=true");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/posts/${editingId}`, form);
    } else {
      await api.post("/posts", form);
    }

    resetForm();
    loadPosts();
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      status: post.status
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this post?")) {
      await api.delete(`/posts/${id}`);
      loadPosts();
    }
  };

  return (
    <div className="container">
      <h1>Manage Posts</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="excerpt" placeholder="Excerpt" value={form.excerpt} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <button type="submit">{editingId ? "Update Post" : "Create Post"}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>{post.author?.name}</td>
              <td>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
