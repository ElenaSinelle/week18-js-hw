'use strict'
document.addEventListener('DOMContentLoaded', () => {
// tests
// localStorage.clear();
// localStorage.setItem('tasksObj', JSON.stringify({"todo1": true, "todo2": false}));

const input = document.querySelector('.todo-list__input');

const btn = document.querySelector('.todo-list__button');
btn.disabled = true;

const clearListBtn = document.querySelector('.todo-list__clear');
clearListBtn.disabled = true;

const list = document.querySelector('.todo-list__list');
const result = document.querySelector('.todo-list__result');
const noTasksMessage = document.querySelector('.todo-list__no-tasks-message');
noTasksMessage.textContent = 'You have no tasks yet';

//-------------------------------------------------------------------------------

//draw tasks according to local storage
let tasksObj = localStorage.getItem('tasksObj') ? JSON.parse(localStorage.getItem('tasksObj')) : {};

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

      let label = document.createElement('label');
      label.classList.add('todo-list__chbox-label');
      label.textContent = task;
      newLi.append(label);

      noTasksMessage.textContent = null;
      clearListBtn.disabled = false;
    }
  }
}

drawSavedList(tasksObj);

//-------------------------------------------------------------------------------

// add new task and update local storage
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
  let isValid = input.value.trim() !== "" ? true : false;
  btn.disabled = !isValid;
}

input.addEventListener('input', inputValidation); //input listener

btn.addEventListener('click', function(){ // add to list button listener
  addNewTask();
  btn.disabled = true;
})

//-------------------------------------------------------------------------------

// observe change of existing chboxes
let chboxes = [...list.querySelectorAll('.todo-list__chbox')];

chboxes.forEach(chbox => chbox.addEventListener('change', function(event) {
  let target = event.target;
  let task = target.nextElementSibling.textContent;
  refreshLocalStorage(task, target.checked);
}))

// observe change of last added chbox
let callback =  function(mutationsList) {
  let target = mutationsList[1].addedNodes[0];
  // console.log(target);
  if (target) {
    target.addEventListener('change', function() {
      let task = target.nextElementSibling.textContent;
      refreshLocalStorage(task, target.checked);
    })
  }
};

let observer = new MutationObserver(callback);

let options = {
  'childList': true,
  'attributes':true,
  'subtree': true
};

observer.observe(list, options);

// clear task-list
clearListBtn.addEventListener('click', function(){
  localStorage.clear();
  document.querySelectorAll('.todo-list__item').forEach(item => item.remove());
  tasksObj = {};
  noTasksMessage.textContent = 'You have no tasks yet';
  btn.disabled = true;
  clearListBtn.disabled = true;
})

})