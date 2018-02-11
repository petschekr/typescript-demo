import * as express from "express";
import * as bodyParser from "body-parser";
import * as moment from "moment";
import { request } from "http";

const timeFormat: string = "h:mm A";
const dateFormat: string = "MMMM Do, YYYY";
export let apiRouter = express.Router();

interface ITask {
	id: string;
}
// Task class? No date vs. date?

// Memory store for tasks
// Don't do this in production
let tasks: ITask[] = [];

apiRouter.route("/tasks").get((request, response) => {
	response.json(tasks);
}).post(bodyParser.json(), (request, response) => {
	let name = request.body.name;
	// TODO: create task and add to list
});

apiRouter.route("/task/:id").post((request, response) => {
	let id: string = request.param("id");
	for (let task of tasks) {
		// Why do we use === here?
		if (task.id === id) {
			task.complete();
			console.log(`Completed task with id ${id}`);
		}}
});
