import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    title: "5 Tips for a Healthy Heart",
    date: "May 2025",
    summary: "Simple lifestyle changes to keep your heart healthy and strong.",
    link: "#"
  },
  {
    title: "How to Prepare for an Online Consultation",
    date: "April 2025",
    summary: "Maximize your virtual doctor visit with these easy steps.",
    link: "#"
  },
  {
    title: "Understanding Digital Prescriptions",
    date: "March 2025",
    summary: "Learn how to access and use your digital prescriptions safely.",
    link: "#"
  },
  {
    title: "Managing Stress for Better Health",
    date: "February 2025",
    summary: "Effective techniques to reduce stress and improve well-being.",
    link: "#"
  },
  {
    title: "The Importance of Regular Checkups",
    date: "January 2025",
    summary: "Why routine visits are key to long-term health.",
    link: "#"
  },
];

const Blog = () => {
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <h1>
          Health Tips & <span className="medicare-highlight">Articles</span>
        </h1>
        <p>
          Stay informed with expert health advice, wellness tips, and the latest in digital healthcare.
        </p>
      </section>

      {/* Search */}
      <section className="blog-search">
        <input
          type="text"
          className="blog-search-input"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search blog articles"
        />
      </section>

      {/* Blog List */}
      <section className="blog-list-section">
        {filteredPosts.length === 0 ? (
          <div className="blog-empty">
            <i className="bi bi-emoji-frown" style={{ fontSize: "2rem" }}></i>
            <p>No articles found. Try a different keyword.</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {filteredPosts.map((post, idx) => (
              <div className="blog-post-card" key={idx}>
                <div className="blog-post-meta">
                  <span className="blog-post-date">
                    <i className="bi bi-calendar-event me-1"></i>
                    {post.date}
                  </span>
                </div>
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-post-summary">{post.summary}</p>
                <a href={post.link} className="btn blog-read-btn" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-book me-1"></i>
                  Read More
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="blog-cta">
        <h4>Have a health story or tip to share?</h4>
        <Link to="/contact" className="blog-cta-link">
          Submit a Health Article
        </Link>
      </section>
    </div>
  );
};

export default Blog;
