import { getAllPosts, getPostById } from "./data.js";

async function showAllPosts() {
	try {
		const posts = await getAllPosts();
		console.log("----- All Posts -----");
		posts.forEach((post) => {
			console.log(`${post.id}: ${post.title}`);
		});
		console.log("---------------------\n");
	} catch (error) {
		console.error("Error displaying all posts:", error);
	}
}

async function showPostById(id) {
	try {
		const post = await getPostById(id);
		if (post) {
			console.log("----- Post Details -----");
			console.log(`Title: ${post.title}`);
			console.log(`Body: ${post.body}`);
			console.log(`Author ID: ${post.userId}`);
			console.log("-------------------------\n");
		} else {
			console.log(`Post with ID ${id} not found.`);
		}
	} catch (error) {
		console.error(`Error displaying post with ID ${id}:`, error);
	}
}

// showAllPosts();
// showPostById(1);
// showPostById(10);
