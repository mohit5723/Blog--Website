import { formatISO9075 } from 'date-fns';

export default function Post({
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
				<img
					src={`http://localhost:4000/` + cover}
					alt=""
				/>
			</div>
			<div className="content">
				<h2>{title}</h2>
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
