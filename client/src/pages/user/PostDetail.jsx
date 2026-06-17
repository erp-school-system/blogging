import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import AdSlot from "../../components/AdSlot";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const loadPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  if (!post) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container page-shell">
      <AdSlot id="div-gpt-ad-top-banner" className="ad-banner" />

      <div className="page-grid">
        <article className="post-detail">
          {post.image && <img src={post.image} alt={post.title} />}

          <h1>{post.title}</h1>
          <p className="muted">By {post.author?.name || "Admin"}</p>

          <AdSlot id="div-gpt-ad-incontent-1" className="ad-incontent" />

          <p>{post.content}</p>

          <AdSlot id="div-gpt-ad-incontent-2" className="ad-incontent" />

          <p>
            This is an extra paragraph to show how in-content ads can appear
            between blog content sections.
          </p>

          <AdSlot id="div-gpt-ad-bottom-banner" className="ad-banner content-end-ad" />
        </article>

        <aside className="sidebar">
          <AdSlot id="div-gpt-ad-sidebar" className="ad-sidebar" />
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;
