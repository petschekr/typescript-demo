import * as fs from "fs";

// Needs a seperate type package
import * as express from "express";
// Has its own types built-in!
import * as moment from "moment";
// From another .ts file
import { getSetting, updateSetting } from "./settings";

let app = express();

function readFileAsync(filename: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		fs.readFile(filename, "utf8", (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}

app.route("/").get(async (request, response) => {
	response.send(await readFileAsync("index.html"));
	console.log(`Request for / processed at ${moment().format("h:mm A")}`);
});
app.route("/js/main.js").get(async (request, response) => {
	response.send(await readFileAsync("js/main.js"));
});

import { apiRouter } from "./routes/api";
app.use("/api", apiRouter);

// Generics!
// Why is the type annotation optional here?
updateSetting("port", 3000);
app.listen(getSetting<number>("port"), () => {
	console.log(`HackGT Checklist listening for requests on port ${getSetting<number>("port")}`);
});
