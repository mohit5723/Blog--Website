import { formatISO9075 } from 'date-fns';
import 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Post({
	_id,
	title,
	summary,
	cover,
	content,
	author,
	category,
	createdAt,
}) {
	return (
		<div className="post">
			<div className="images">
				<Link to={`/post/${_id}`}>
					<img
						src={`http://localhost:4000/` + cover}
						alt=""
					/>{' '}
				</Link>
			</div>
			<div className="content">
				<Link to={`/post/${_id}`}>
					<h2>{title}</h2>
				</Link>
				<p className="info">
					<a
						href=""
						className="author"
					>
						{author.userName}
					</a>
					<time>{formatISO9075(new Date(createdAt))}</time>
				</p>
				<p className="summary">{summary}</p>
			</div>
		</div>
	);
}
