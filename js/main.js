"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Returns a promise containing the parsed JSON from a fetch() Response
function parseJSON(response) {
    return response.json();
}
document.addEventListener("DOMContentLoaded", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    function markDone(event) {
        return __awaiter(this, void 0, void 0, function () {
            var button, id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        button = event.target;
                        id = button.dataset.id;
                        return [4 /*yield*/, fetch("/api/task/" + id, {
                                method: "POST"
                            }).then(parseJSON)];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        // Remove the task from the list
                        button.parentElement.remove();
                        return [2 /*return*/];
                }
            });
        });
    }
    var taskTemplate, taskArea, addButton, taskName, response, i, instance, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskTemplate = document.querySelector("#task");
                taskArea = document.querySelector("#checklist");
                addButton = document.querySelector("#add");
                taskName = document.querySelector("input");
                if (taskName === null) {
                    console.error("Missing task name element");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("/api/tasks").then(parseJSON)];
            case 2:
                response = _a.sent();
                for (i = 0; i < response.length; i++) {
                    instance = document.importNode(taskTemplate.content, true);
                    instance.querySelector("h3").textContent = response[i].title;
                    instance.querySelector("p").textContent = response[i].description;
                    instance.querySelector("button").dataset.id = response[i].id;
                    instance.querySelector("button").addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, markDone(e)];
                                case 1:
                                    _a.sent();
                                    alert("Marked task as done");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    alert("An error occurred while marking the task as done!");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    taskArea.appendChild(instance);
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4:
                addButton.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var err_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fetch("/api/tasks", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            "name": taskName.value
                                        }),
                                        headers: new Headers({
                                            "Content-Type": "application/json"
                                        })
                                    }).then(parseJSON)];
                            case 1:
                                _a.sent();
                                taskName.value = "";
                                alert("Task added successfully");
                                window.location.reload();
                                return [3 /*break*/, 3];
                            case 2:
                                err_3 = _a.sent();
                                console.error(err_3);
                                alert("An error occurred while adding the task");
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
