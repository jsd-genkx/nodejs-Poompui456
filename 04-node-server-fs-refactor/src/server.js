import { createServer } from "node:http";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;
const HOSTNAME = "127.0.0.1";

async function startServer() {
	const server = createServer(app());
	server.listen(PORT, HOSTNAME, () => {
		console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
	});
}

startServer();
