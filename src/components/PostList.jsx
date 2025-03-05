import { Link } from 'react-router-dom';

function PostList({ posts }) {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="container">
      <h1>Latest Posts</h1>
      <div className="post-list">
        {sortedPosts.length === 0 ? (
          <p>No posts found. Create some issues on GitHub!</p>
        ) : (
          sortedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h2>
              <div className="post-meta">
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="post-author">by {post.author}</span>
              </div>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="post-excerpt">
                {post.content.slice(0, 150)}
                {post.content.length > 150 ? '...' : ''}
              </p>
              <Link to={`/post/${post.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostList;