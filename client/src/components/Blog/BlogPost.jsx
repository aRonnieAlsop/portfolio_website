import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams(); // Extract the ID from the route
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the blog post');
        }
        const data = await response.json();
        setBlogPost(data); // Store the entire blog post

      } catch (err) {
        console.error('Error fetching the blog post:', err);
        setError("It's not you, it's me. Please try again later.");
      }
    };

    fetchBlogPost();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogPost) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="blog-title">{blogPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.blog_content }} className="blog-post-content" />
    </div>
  );
};

export default BlogPost;
