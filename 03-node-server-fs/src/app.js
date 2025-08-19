import { readFile, writeFile, appendFile } from "node:fs/promises";
import { resolve } from "node:path";

/** ---------- Base Directory ---------- */
const BASE_DIR = process.cwd();

/** ---------- File Operations ---------- */
export async function readTextFile(filename) {
	return await readFile(resolve(BASE_DIR, filename), "utf8");
}

export async function createFile(filename, content) {
	await writeFile(resolve(BASE_DIR, filename), content, "utf8");
}

export async function appendToFile(filename, content) {
	await appendFile(resolve(BASE_DIR, filename), content, "utf8");
}

/** ---------- Utility ---------- */
export function countWords(text) {
	if (!text) return 0;
	return text.trim().split(/\s+/).filter(Boolean).length;
}

/** ---------- Response Helper ---------- */
export function sendText(res, statusCode, message) {
	res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
	res.end(message);
}

/** ---------- Request Handler ---------- */
const fileName = "sample.txt";
/** ---------- Request Handler ---------- */
export async function handleRequest(req, res) {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;
	try {
		if (req.method === "GET" && pathname === "/") {
			sendText(res, 200, "🎉 Welcome to the Node HTTP Server! 🎉");
		} else if (req.method === "GET" && pathname === "/file") {
			const content = await readTextFile(fileName);
			const wordCount = countWords(content);
			const message = `File content:\n\n${content}\n\nWord count: ${wordCount}`;
			sendText(res, 200, message);
		} else if (req.method === "POST" && pathname === "/file") {
			let body = "";
			for await (const chunk of req) body += chunk;

			await createFile(fileName, body);
			sendText(res, 201, "File created successfully!");
		} else if (req.method === "PUT" && pathname === "/file") {
			let body = "";
			for await (const chunk of req) body += chunk;

			const contentToAppend = "\n" + body;
			await appendToFile(fileName, contentToAppend);

			sendText(res, 200, "Content appended successfully!");
		} else {
			sendText(res, 404, "Not Found");
		}
	} catch (err) {
		console.error("Handler error:", err);
		sendText(res, 500, "Internal Server Error");
	}
}
