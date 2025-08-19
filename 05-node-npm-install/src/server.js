import { createServer } from "node:http";
import chalk from "chalk";
import cowsay from "cowsay";

const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello World");
});

server.listen(PORT, HOSTNAME, () => {
	console.log(
		chalk.bgBlueBright(`Server running at http://${HOSTNAME}:${PORT}/`)
	);
	console.log(chalk.bold.magenta(cowsay.say({ text: "npm is fun!" })));
});
