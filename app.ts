import { parse, stringify } from "qs";
import { deflate, inflate } from "pako";

const root = document.createElement("div");
const taskDiv = document.createElement("div");
const taskList = document.createElement("ul");
const form = document.createElement("form");

const filterInput = document.createElement("input");
filterInput.placeholder = "Add task...";
filterInput.onchange = e => {
    const target = <HTMLInputElement>e.currentTarget;
    addTask(target.value);
};

let state = { tasks: [] };
const cleanSearch = window.location.search.replace("?", "");

console.log(cleanSearch.length);

if (cleanSearch.length > 0) {
    try {
        let oldState = parse(inflate(atob(cleanSearch), { to: "string" }));
        if (oldState.tasks && Array.isArray(oldState.tasks)) {
            state = oldState;
        }
    } catch (err) {
        console.error(err);
    }
}

state.tasks.forEach(task => {
    const taskNode = document.createElement("li");
    taskNode.appendChild(document.createTextNode(task));
    taskList.appendChild(taskNode);
});

taskDiv.appendChild(filterInput);
taskDiv.appendChild(taskList);
root.appendChild(form);
root.appendChild(taskDiv);
document.body.appendChild(root);
filterInput.focus();

function addTask(task) {
    // state.tasks = state.tasks.concat({ name: task, completed: false });
    state.tasks = state.tasks.concat(task);
    render();
}

function completeTask(task) {
    state.tasks = state.tasks
        .filter(task => task.name === task)
        .map(task => ({ ...task, completed: true }));
    render();
}

function render() {
    window.location.search = btoa(deflate(stringify(state), { to: "string" }));
}
