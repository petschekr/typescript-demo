// Returns a promise containing the parsed JSON from a fetch() Response
function parseJSON(response: Response) {
	return response.json();
}

document.addEventListener("DOMContentLoaded", async event => {
	// JavaScript won't catch this being overwritten
	// What if this doesn't exist?
	const taskTemplate = document.querySelector("#task") as HTMLTemplateElement;
	const taskArea = document.querySelector("#checklist") as HTMLMainElement;
	const addButton = document.querySelector("#add") as HTMLButtonElement;
	const taskName = document.querySelector("input"); // We don't have to cast this. Why not?
	if (taskName === null) {
		console.error("Missing task name element");
		return;
	}


	

	async function markDone(event: MouseEvent): Promise<void> {
		let button = event.target as HTMLButtonElement;
		let id = button.dataset.id;
		let response = await fetch("/api/task/" + id, {
			method: "POST"
		}).then(parseJSON);

		console.log(response);
		// Remove the task from the list
		button.parentElement!.remove();
	}
	
	try {
		let response = await fetch("/api/tasks").then(parseJSON);

		for (let i = 0; i < response.length; i++) {
			let instance = document.importNode(taskTemplate.content, true);
			instance.querySelector("h3")!.textContent = response[i].title;
			instance.querySelector("p")!.textContent = response[i].description;
			instance.querySelector("button")!.dataset.id = response[i].id;
			instance.querySelector("button")!.addEventListener("click", async e => {

				try {
					await markDone(e);
					alert("Marked task as done");
				}
				catch (err) {
					console.error(err);
					alert("An error occurred while marking the task as done!");
				}
			});
			taskArea.appendChild(instance);
		}
	}
	catch (err) {
		console.error(err);
	}

	addButton.addEventListener("click", async e => {

		try {

			await fetch("/api/tasks", {
				method: "POST",
				body: JSON.stringify({
					"name": taskName.value
				}),
				headers: new Headers({
					"Content-Type": "application/json"
				})
			}).then(parseJSON);
			
			taskName.value = "";
			alert("Task added successfully");
			window.location.reload();
		}
		catch (err) {
			console.error(err);
			alert("An error occurred while adding the task");

		}
	});
});
