document.addEventListener("DOMContentLoaded", () => {
const taskInput = document.querySelector('.todo-list__input');

const addTaskBtn = document.querySelector('.todo-list__button');
addTaskBtn.disabled = true;

const clearListBtn = document.querySelector('.todo-list__clear');
clearListBtn.disabled = true;

const taskList =  document.querySelector('.todo-list__list');
const noTasksMessage = document.querySelector('.todo-list__no-tasks-message');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// update local storage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// draw single task
function renderTask(task, index) {
  const listItem = document.createElement('div');

  listItem.innerHTML = `
    <input type="checkbox" id="task${index}" ${task.completed ? "checked" : ""}>
    <label for="task${index}">${task.text}</label>
    `;

  taskList.appendChild(listItem);

  document.getElementById(`task${index}`).addEventListener('change', () => {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
  });
};

// draw all tasks
function renderTasks() {
  taskList.innerHTML = '';
  clearListBtn.disabled = tasks.length === 0 ? true : false;

  if (tasks.length === 0) {
    noTasksMessage.textContent = 'You have no tasks yet';
  } else {
    noTasksMessage.textContent = '';
    tasks.forEach(renderTask);
  }
};

function addTask() {
  const newTask = taskInput.value.trim();
  if (newTask) {
    tasks.push({ text: newTask, completed: false });
    updateLocalStorage();
    taskInput.value = null;
    renderTasks();
  }
};

function clearList () {
  tasks = [];
  updateLocalStorage();
  renderTasks();
};

// validation of input
function inputValidation() {
  let isValid = taskInput.value.trim() !== "" ? true : false;
  addTaskBtn.disabled = !isValid;
}

// render task list
renderTasks();

// listen input and enable addTaskBtn
taskInput.addEventListener('input', inputValidation);

// listen addTaskBtn
addTaskBtn.addEventListener('click', () => {
  addTask();
  addTaskBtn.disabled = true;
});

// listen clearListBtn
clearListBtn.addEventListener('click', clearList);
});
