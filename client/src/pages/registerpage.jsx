import { useState } from 'react';

export default function RegisterPage() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [bday, setBday] = useState('');

	async function register(e) {
		e.preventDefault();
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify({ userName, password }),
			headers: { 'Content-Type': 'application/json' },
		});
		console.log(response);

		//checking for user reg
		if (response.status !== 200) {
			alert('registeration failed');
		} else {
			alert('registeration successful');
		}
	}

	return (
		<form
			className="register"
			onSubmit={register}
		>
			<h1>Register</h1>
			<label htmlFor="username">What should we call you? </label>
			<input
				id="username"
				type="text"
				placeholder="username"
				value={userName}
				onChange={(e) => {
					setUserName(e.target.value);
				}}
			/>
			<label htmlFor="password">Your Password</label>
			<input
				id="password"
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			
			<button>register</button>
		</form>
	);
}
