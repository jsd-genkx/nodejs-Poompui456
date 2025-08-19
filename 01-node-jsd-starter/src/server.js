import { app } from "./app.js";

console.log("server.js");
console.log(process.env.PORT);

const myApp = app();

console.log(myApp);
