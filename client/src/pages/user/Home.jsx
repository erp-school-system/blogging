import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import AdSlot from "../../components/AdSlot";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="container page-shell">
      <AdSlot id="div-gpt-ad-top-banner" className="ad-banner" />

      <div className="page-grid">
        <section>
          <div className="section-heading">
            <p className="eyebrow">Fresh stories</p>
            <h1>Latest Posts</h1>
          </div>

          <div className="posts-grid">
            {posts.map((post) => (
              <article className="card" key={post._id}>
                {post.image && <img src={post.image} alt={post.title} />}
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link to={`/posts/${post._id}`}>Read More</Link>
              </article>
            ))}
          </div>

          <AdSlot id="div-gpt-ad-bottom-banner" className="ad-banner content-end-ad" />
        </section>

        <aside className="sidebar">
          <AdSlot id="div-gpt-ad-sidebar" className="ad-sidebar" />
        </aside>
      </div>
    </div>
  );
};

export default Home;
