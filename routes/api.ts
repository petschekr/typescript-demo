import * as express from "express";
import * as bodyParser from "body-parser";
import * as moment from "moment";
import * as crypto from "crypto";
import { request } from "http";

const timeFormat: string = "h:mm A";
const dateFormat: string = "MMMM Do, YYYY";
export let apiRouter = express.Router();

interface ITask {
	id: string;
	name: string;
	description: string;
	isComplete: boolean;

	complete(): void;
}

class Task implements ITask {
	private _id: string = "";

	get id(): string {
		return this._id;
	}
	set id(value: string) {
		this._id = value;
	}

	public name: string;
	public description: string;

	constructor(name: string, description: string) {
		this.id = crypto.randomBytes(16).toString("hex");
		this.name = name;
		this.description = description;
	}

	public isComplete: boolean = false;
	public complete(): void {
		this.isComplete = true;
	}
}
class TimedTask implements ITask {
	private _id: string = "";

	get id(): string {
		return this._id;
	}
	set id(value: string) {
		this._id = value;
	}

	public name: string;
	public description: string;

	constructor(name: string, description: string) {
		this.id = crypto.randomBytes(16).toString("hex");
		this.name = name;
		this.description = `${description} ${moment().format(timeFormat)}`;
	}

	public isComplete: boolean = false;
	public complete(): void {
		this.isComplete = true;
	}
}

// Memory store for tasks
// Don't do this in production
let tasks: ITask[] = [];

apiRouter.route("/tasks").get((request, response) => {
	response.json(tasks.filter(task => !task.isComplete).map(task => {
		return {
			title: task.name,
			description: task.description,
			id: task.id
		}
	}));
}).post(bodyParser.json(), (request, response) => {
	let name = request.body.name;

	let task = new Task(name, "");
	tasks.push(task);

	response.send({
		"success": true
	});
});

apiRouter.route("/task/:id").post((request, response) => {
	let id: string = request.param("id");
	let index = 0;
	for (let task of tasks) {
		// Why do we use === here?
		if (task.id === id) {
			task.complete();
			tasks.splice(index, 1);
			console.log(`Completed task with id ${id}`);
			break;
		}
		index++;
	}
	response.send({
		"success": true
	});
});
