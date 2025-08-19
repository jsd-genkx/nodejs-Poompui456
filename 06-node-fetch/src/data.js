export async function getAllPosts() {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");
		const posts = await response.json();
		return posts;
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function getPostById(id) {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		);
		const post = await response.json();
		return post;
	} catch (error) {
		console.error(`Error fetching post with ID ${id}:`, error);
		return null;
	}
}
