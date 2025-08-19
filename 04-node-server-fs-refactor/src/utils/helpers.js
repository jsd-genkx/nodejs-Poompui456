export function countWords(text) {
	if (!text) return 0;
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function sendText(res, statusCode, message) {
	res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
	res.end(message);
}
