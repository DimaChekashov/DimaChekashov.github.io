'use client';

import { useEffect, useState } from "react";

const fetchPosts = async () => {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  return posts;
}

export default function Blog() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const postData = await fetchPosts();
				console.log(postData);
				setPosts(postData);
			} catch(err) {
				console.error(err);
			}
		}

		fetchData();
	}, [])

	return (
		<div>
			{posts.map((post) => (
				<div key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
}
