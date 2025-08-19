import {
	getRoot,
	getFile,
	postFile,
	putFile,
} from "../controllers/fileController.js";

export const routes = [
	{ method: "GET", path: "/", handler: getRoot },
	{ method: "GET", path: "/file", handler: getFile },
	{ method: "POST", path: "/file", handler: postFile },
	{ method: "PUT", path: "/file", handler: putFile },
];
