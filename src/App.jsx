import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Post from './components/Post';
import './index.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts data
    fetch('./data/posts.json')
      .then(response => response.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container loading">
        <p>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<PostList posts={posts} />} />
            <Route path="/post/:id" element={<Post posts={posts} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;