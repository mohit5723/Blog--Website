const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('./models/Post.js');
const app = express();

app.use('/uploads', express.static(__dirname + '/uploads'));

// for encrption
var salt = bcrypt.genSaltSync(10);
// for jwt
const secret = 'asjqh291ue29qowanfoqhfq8u1ri1rn308h9';

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
// middleware for authentication of user info:
app.use(cookieParser());

mongoose.connect(
	'mongodb+srv://blog:n7mnh4CQUaUPXtfh@cluster0.aldgqty.mongodb.net/?retryWrites=true&w=majority'
);

app.post('/register', async (req, res) => {
	// res.json("200 ok")
	const { userName, password } = req.body;
	try {
		const userDoc = await User.create({
			userName,
			password: bcrypt.hashSync(password, salt),
		});
		res.json(userDoc);
	} catch (error) {
		res.status(400).json(error);
	}
});

app.post('/login', async (req, res) => {
	const { userName, password } = req.body;
	const userDoc = await User.findOne({ userName });
	if (!userDoc) {
		res.status(401).send('Invalid username or password');
	}
	// res.json(userDoc)
	const passOk = bcrypt.compareSync(password, userDoc.password);
	// res.json(passOk)

	if (passOk) {
		//logged in
		//! ere, you're passing an object with both userName and id to jwt.sign(). This means both userName and id are being signed with the JWT secret. When you decode the token later, you will have access to both userName and id. This is why you're able to fetch the userName along with other user-related data upon executing the second code snippet.
		jwt.sign({ userName, id: userDoc._id }, secret, {}, (err, token) => {
			if (err) throw err;
			res.cookie('token', token).json({
				id: userDoc._id,
				userName,
			});
		});
	} else {
		res.status(400).json('invalid credentials');
	}
});

// authentication after login to check for correct user token
//! dont know how it works dont touch
app.get('/profile', (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, secret, {}, (err, info) => {
		if (err) throw err;
		res.json(info);
	});
});

app.post('/logout', (req, res) => {
	res.cookie('token', '').json('ok');
});

// posts

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
	// adding extension to the file from orignal uploaded file and rename it
	const { originalname, path } = req.file;
	const parts = originalname.split('.');
	const ext = parts[parts.length - 1];
	const newPath = path + '.' + ext;
	fs.renameSync(path, newPath);

	const { token } = req.cookies;
	jwt.verify(token, secret, {}, async (err, info) => {
		if (err) throw err;
		const { title, summary, content, category } = req.body;
		const postDoc = await Post.create({
			title,
			summary,
			content,
			category,
			cover: newPath,
			author: info.id,
		});
		res.json(postDoc);
	});

	// res.json({ files: req.file });
});

app.get('/post', async (req, res) => {
	res.json(
		await Post.find()
			.populate('author', ['userName'])
			.sort({ createdAt: -1 })
			.limit(20)
	);
});

// dynamic routing of post

app.get('/post/:id', async (req, res) => {
	const { id } = req.params;

	// populate the author because we aare no able to get user id and display username only bec password is also coming
	const postDoc = await Post.findById(id).populate('author', ['userName']);
	res.json(postDoc);
	// res.json(req.params)
});

// edit post

// app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
// 	let newPath = null;
// 	if (req.file) {
// 		const { originalname, path } = req.file;
// 		const parts = originalname.split('.');
// 		const ext = parts[parts.length - 1];
// 		newPath = path + '.' + ext;
// 		fs.renameSync(path, newPath);
// 	}

// 	const { token } = req.cookies;
// 	jwt.verify(token, secret, {}, async (err, info) => {
// 		if (err) throw err;
// 		const { id, title, summary, content } = req.body;
// 		const postDoc = await Post.findById(id);
// 		const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
// 		if (!isAuthor) {
// 			return res.status(400).json('you are not the author');
// 		}
// 		await postDoc.update({
// 			title,
// 			summary,
// 			content,
// 			cover: newPath ? newPath : postDoc.cover,
// 		});

// 		res.json(postDoc);
// 	});
// });

app.listen(4000, () => console.log('listerning to port 4000'));

// mongodb+srv://blog:n7mnh4CQUaUPXtfh@cluster0.aldgqty.mongodb.net/?retryWrites=true&w=majority
