import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './usercontext';
import LoginPage from './pages/loginpage';

export default function Header() {
	const { setUserInfo, userInfo } = useContext(UserContext);

	useEffect(() => {
		// Check if the user is authenticated
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
			'$1'
		);
		if (!token) {
			// Redirect the user to the login page or handle the case where the user is not authenticated
			console.log('User is not authenticated');
			return;
		}

		// If the user is authenticated, fetch user profile
		fetch('http://localhost:4000/profile', {
			credentials: 'include',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch user profile');
				}
				return response.json();
			})
			.then((userInfo) => {
				setUserInfo(userInfo);
			})
			.catch((error) => {
				console.error('Error fetching user profile:', error);
			});
	}, []);

	function logout() {
		fetch('http://localhost:4000/logout', {
			credentials: 'include',
			method: 'POST',
		});
		setUserInfo(null);
	}

	const username = userInfo?.userName;

	return (
		<header>
			<Link
				to="/"
				className="logo"
			>
				MyBlog
			</Link>
			<nav>
				{username && (
					<>
						{console.log(username)}
						{/* <p>{userName}</p> */}
						<Link to="/create">Create new Post</Link>
						<a onClick={logout}>Logout</a>
					</>
				)}
				{!username && (
					<>
						{console.log(username)}
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	);
}
