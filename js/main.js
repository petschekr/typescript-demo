// Returns a promise containing the parsed JSON from a fetch() Response
function parseJSON(response) {
	return response.json();
}

document.addEventListener("DOMContentLoaded", function (event) {
	// JavaScript won't catch this being overwritten
	// What if this doesn't exist?
	const taskTemplate = document.querySelector("#task");
	const taskArea = document.querySelector("#checklist");
	const addButton = document.querySelector("#add");
	const taskName = document.querySelector("input"); // We don't have to cast this. Why not?

	function markDone(event, callback) {
		let id = event.target.dataset.id;
		fetch("/api/task/" + id, {
			method: "POST"
		}).then(parseJSON).then(function (response) {
			console.log(response);
			// Remove the task from the list
			event.target.parentElement.remove();
			// null = no error
			callback(null);
		}).catch(function (err) {
			callback(err);
		});
	}
	
	fetch("/api/tasks").then(parseJSON).then(function (response) {
		for (let i = 0; i < response.length; i++) {
			let instance = document.importNode(taskTemplate.content, true);
			instance.querySelector("h3").textContent = response[i].title;
			instance.querySelector("p").textContent = response[i].description;
			instance.querySelector("button").dataset.id = response[i].id;
			instance.querySelector("button").addEventListener("click", function (e) {
				markDone(e, function(err) {
					if (err) {
						console.error(err);
						alert("An error occurred while marking the task as done!");
						return;
					}
					alert("Marked task as done");
				});
			});
			taskArea.appendChild(instance);
		}
	}).catch(function (err) {
		console.error(err);
	});

	addButton.addEventListener("click", function (e) {
		fetch("/api/tasks", {
			method: "POST",
			body: {
				"name": taskName.value
			},
			headers: new Headers({
				"Content-Type": "application/json"
			})
		}).then(parseJSON).then(function (response) {
			taskName.value = "";
			alert("Task added successfully");
			window.location.reload();
		}).catch(function (err) {
			console.error(err);
			alert("An error occurred while adding the task");
		});
	});
});
