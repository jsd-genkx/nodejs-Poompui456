import { createServer } from "node:http";
import { getAllPosts } from "./data.js";

const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 4000;

const server = createServer(async (req, res) => {
	if (req.url === "/" && req.method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end("Please navigate to /posts");
	} else if (req.url === "/posts" && req.method === "GET") {
		try {
			const posts = await getAllPosts();
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(posts));
		} catch (err) {
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("Server error while fetching posts");
		}
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not Found");
	}
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
