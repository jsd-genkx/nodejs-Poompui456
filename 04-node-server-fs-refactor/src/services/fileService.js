import { readFile, writeFile, appendFile } from "node:fs/promises";
import { resolve } from "node:path";

const BASE_DIR = process.cwd();

export async function readTextFile(filename) {
	return await readFile(resolve(BASE_DIR, filename), "utf8");
}

export async function createFile(filename, content) {
	await writeFile(resolve(BASE_DIR, filename), content, "utf8");
}

export async function appendToFile(filename, content) {
	await appendFile(resolve(BASE_DIR, filename), content, "utf8");
}
