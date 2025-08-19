import {
	readTextFile,
	createFile,
	appendToFile,
} from "../services/fileService.js";
import { countWords, sendText } from "../utils/helpers.js";

const fileName = "sample.txt";

export async function getRoot(req, res) {
	sendText(res, 200, "🎉 Welcome to the Node HTTP Server! 🎉");
}

export async function getFile(req, res) {
	const content = await readTextFile(fileName);
	const wordCount = countWords(content);
	const message = `File content:\n\n${content}\n\nWord count: ${wordCount}`;
	sendText(res, 200, message);
}

export async function postFile(req, res) {
	let body = "";
	for await (const chunk of req) body += chunk;

	await createFile(fileName, body);
	sendText(res, 201, "File created successfully!");
}

export async function putFile(req, res) {
	let body = "";
	for await (const chunk of req) body += chunk;

	await appendToFile(fileName, "\n" + body);
	sendText(res, 200, "Content appended successfully!");
}
