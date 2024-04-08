import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

// for react quill
const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image'],
		['clean'],
	],
};
const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
];

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [content, setContent] = useState('');
	const [files, setFiles] = useState('');
	const [category, setCategory] = useState('');
	const [redirect, setRedirect] = useState(false);

	async function createNewPost(e) {
		const data = new FormData();
		data.set('title', title);
		data.set('summary', summary);
		data.set('category', category);
		data.set('content', content);
		data.set('file', files[0]);
		console.log(files);

		e.preventDefault();

		const response = await fetch('http://localhost:4000/post', {
			method: 'POST',
			body: data,
			credentials: 'include',
		});

		if (response.ok) {
			setRedirect(true);
		}
	}

	if (redirect) {
		return <Navigate to={'/'} />;
	}

	return (
		<div>
			<form onSubmit={createNewPost}>
				<input
					type="title"
					placeholder={'Title'}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<input
					type="summary"
					placeholder={'Summary'}
					value={summary}
					onChange={(e) => setSummary(e.target.value)}
					required
				/>
				<input
					type="file"
					onChange={(e) => setFiles(e.target.files)}
					required
				/>
				<div>
					<label>
						Choose blog category:
						<select
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
							}}
						>
							<option value="uncategorized">uncategorized</option>
							<option value="entertainment">Entertainment</option>
							<option value="education">Education</option>
							<option value="science">Science</option>
						</select>
					</label>
				</div>
				<ReactQuill
				
					value={content}
					modules={modules}
					formats={formats}
					onChange={(newValue) => setContent(newValue)}
				/>
				<button style={{ marginTop: '10px' }}>Create Post</button>
			</form>
		</div>
	);
}
