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
			const filtered = posts.filter(
				(post) => post.category === selectedCategory
			);
			setFilteredPosts(filtered);
		}
	}, [selectedCategory, posts]);

	// Function to handle category change
	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	return (
		<div>
			{/* Category filter */}
			<select
				value={selectedCategory}
				onChange={(e) => handleCategoryChange(e.target.value)}
			>
				<option value="all">All</option>
				{/* <option value="uncategorized">Uncategorized</option> */}
				<option value="science">Science</option>
				<option value="entertainment">Entertainment</option>
				<option value="education">Education</option>
			</select>
			{/* Display filtered posts */}
			{filteredPosts.length > 0 &&
				filteredPosts.map((post) => (
					<Post
						key={post._id}
						{...post}
					/>
				))}
		</div>
	);
}
