import { createServer } from "node:http";

const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello World");
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
