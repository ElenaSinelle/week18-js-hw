'use strict'
document.addEventListener('DOMContentLoaded', () => {

const input = document.querySelector('.todo-list__input');

const btn = document.querySelector('.todo-list__button');
btn.disabled = true;

const clearListBtn = document.querySelector('.todo-list__clear');
clearListBtn.disabled = true;

const list = document.querySelector('.todo-list__list');
const result = document.querySelector('.todo-list__result');
const noTasksMessage = document.querySelector('.todo-list__no-tasks-message');

let chboxes = [...list.querySelectorAll('.todo-list__chbox')];

//draw tasks according to local storage

// localStorage.clear();
let tasksObj = localStorage.getItem('tasksObj') ? JSON.parse(localStorage.getItem('tasksObj')) : {};

// localStorage.setItem('tasksObj', JSON.stringify({"todo1": true, "todo2": false}));

function drawSavedList(obj) {
  if (obj && Object.keys(obj).length !== 0) {
    for (let task in obj) {
      let newLi = document.createElement('li');
      newLi.classList.add('todo-list__item');
      list.append(newLi);

      let chbox = document.createElement('input');
      chbox.type = 'checkbox';
      chbox.classList.add('todo-list__chbox');
      chbox.checked = obj[task];
      newLi.append(chbox);
      chboxes.push(chbox);

      let label = document.createElement('label');
      label.classList.add('todo-list__chbox-label');
      label.textContent = task;
      newLi.append(label);

      noTasksMessage.textContent = null;
      clearListBtn.disabled = false;
    }
  }
}

console.log(tasksObj);
drawSavedList(tasksObj);

// add new task and add it to local storage
function addNewTask() {

  let task = input.value;

  let newLi = document.createElement('li');
  newLi.classList.add('todo-list__item');
  list.append(newLi);

  let chbox = document.createElement('input');
  chbox.type = 'checkbox';
  chbox.classList.add('todo-list__chbox');
  chbox.checked = false;
  newLi.append(chbox);
  chboxes.push(chbox);

  let label = document.createElement('label');
  label.classList.add('todo-list__chbox-label');
  label.textContent = task;
  newLi.append(label);

  noTasksMessage.textContent = null;
  clearListBtn.disabled = false;
  input.value = null;

  refreshLocalStorage(task, chbox.checked);
}

function refreshLocalStorage(task, chbox) {
  tasksObj[task] = chbox;
  localStorage.setItem('tasksObj', JSON.stringify(tasksObj));
}

function inputValidation() {
  if (input.value.trim() === "") {
    input.classList.add('invalid');
    btn.disabled = true;
  } else {
    input.classList.remove('invalid');
    btn.disabled = false;
  }
}

input.addEventListener('input', inputValidation);
btn.addEventListener('click', addNewTask);

chboxes.forEach(chbox => chbox.addEventListener('change', function(event) {
  let target = event.target;
  let task = target.nextElementSibling.textContent;
  refreshLocalStorage(task, target.checked);
}))


// function addTask() {
//   const task = input.value;
//   const taskItem = `<input type="checkbox" name="task" class="todo-list__chbox">
//                   <label class="todo-list__chbox-label">${task}</label>`;
//   const newLi = document.createElement('li');
//   newLi.classList.add('todo-list__item');
//   newLi.innerHTML = taskItem;
//   list.append(newLi);
//   input.value = null;
// }


//

// function addToTasks() {
//   let newTaskItem = list.querySelector('.todo-list__chbox-label').textContent;
//   let isChecked = list.querySelector('.todo-list__chbox').checked ? true : false;
//   tasksObj[newTaskItem] = isChecked;
//   console.log(tasksObj);
//   localStorage.setItem('tasksObj', JSON.stringify(tasksObj));
// }


// btn.addEventListener('click', () => {
//   addNewTask();

// });





// function doneEverything() {
//   let itemsArr = [...list.getElementsByClassName('todo-list__item')];
//   let doneResult = 0;

//   itemsArr.forEach(element => element.classList.contains('done') ? doneResult++ : doneResult)

//   if (doneResult === itemsArr.length) {
//     result.textContent = "Great! Your have done everything for today!!!"
//   } else {
//     result.textContent = null;
//   }
// }




// list.addEventListener('click', function(event) {
//   if (event.target.classList.contains('todo-list__item')) {
//     event.target.classList.toggle('done');
//     event.target.classList.toggle('done');
//   }
//   doneEverything();
// });

})