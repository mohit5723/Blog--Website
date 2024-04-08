import { useEffect, useState } from 'react';
import Post from '../post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // default value

  useEffect(() => {
    fetch('http://localhost:4000/post').then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setFilteredPosts(posts); // Initialize filtered posts with all posts
      });
    });
  }, []);

  // Function to filter posts based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts); // If 'all' category is selected, show all posts
    } else {
      const filtered = posts.filter((post) => post.category === selectedCategory);
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to reset category to 'all'
  const resetCategory = () => {
    setSelectedCategory('all');
  };

  return (
    <div>
      {/* Category buttons */}
      <div className="filter-div">
	  Filter Blogs by :
	  <button className='filter-btn' onClick={() => handleCategoryChange('all')}>All</button>
      <button className='filter-btn' onClick={() => handleCategoryChange('science')}>Science</button>
      <button className='filter-btn' onClick={() => handleCategoryChange('education')}>Education</button>
      <button className='filter-btn' onClick={() => handleCategoryChange('entertainment')}>Entertainment</button>
	  </div>
      {/* Reset button */}
      {/* <button onClick={resetCategory}>Reset</button> */}
      {/* Display filtered posts */}
      {filteredPosts.length > 0 &&
        filteredPosts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
    </div>
  );
}
