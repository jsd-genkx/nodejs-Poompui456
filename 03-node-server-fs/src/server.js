import { createServer } from "node:http";
import { handleRequest } from "./app.js";

const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
	try {
		await handleRequest(req, res);
	} catch (err) {
		console.error("Server error:", err);
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Internal Server Error");
	}
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
