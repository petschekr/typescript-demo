import * as express from "express";
import * as bodyParser from "body-parser";
import * as moment from "moment";
import { randomBytes } from "crypto";

const timeFormat: string = "h:mm A";
const dateFormat: string = "MMMM Do, YYYY";
export let apiRouter = express.Router();

interface ITask {
	id: string;
	title: string;
}
// Task class? No date vs. date?

// Memory store for tasks
// Don't do this in production
let tasks: ITask[] = [];

apiRouter.route("/tasks").get((request, response) => {
	response.json(tasks);
}).post(bodyParser.json(), (request, response) => {
	let name = request.body.name;
	
	tasks.push({
		id: randomBytes(16).toString("hex"),
		title: name
	});
	response.json({
		"success": true
	});
});

apiRouter.route("/task/:id").post((request, response) => {
	let id: string = request.param("id");
	// Hacky -- we'll do this better at the tech talk with classes
	let index = 0;
	for (let task of tasks) {
		// Why do we use === here?
		if (task.id === id) {
			// task.complete();
			tasks.splice(index, 1);
			console.log(`Completed task with id ${id}`);
			break;
		}
		index++;
	}
	response.json({
		"success": true
	});
});
