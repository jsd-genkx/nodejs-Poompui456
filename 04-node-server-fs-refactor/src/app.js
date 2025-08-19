import { routes } from "./routes/fileRoutes.js";
import { sendText } from "./utils/helpers.js";

export function app() {
	return async function handler(req, res) {
		const url = new URL(req.url, `http://${req.headers.host}`);
		const pathname = url.pathname;

		try {
			const route = routes.find(
				(r) => r.method === req.method && r.path === pathname
			);
			if (route) {
				await route.handler(req, res);
			} else {
				sendText(res, 404, "Not Found");
			}
		} catch (err) {
			console.error("Handler error:", err);
			sendText(res, 500, "Internal Server Error");
		}
	};
}
