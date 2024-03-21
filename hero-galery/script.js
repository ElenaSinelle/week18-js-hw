'use strict'
let comments = [];

const button = document.querySelector('.inputs__button');
const chatBody = document.querySelector('.display__body');
const nameInput = document.querySelector('.inputs__name-input');
const avatarInput = document.querySelector('.inputs__avatar-input');
const commentInput = document.querySelector('.inputs__comment-input');

const avatarArr = [
  'assets/img/avatars/ava-0.png',
  'assets/img/avatars/ava-1.png',
  'assets/img/avatars/ava-2.png',
  'assets/img/avatars/ava-3.png',
  'assets/img/avatars/ava-4.png',
  'assets/img/avatars/ava-5.png',
  'assets/img/avatars/ava-6.png',
];

//creation of new comment layout
function createComment(commentData) {
  const commentBlock = document.createElement('div');
  commentBlock.classList.add('comment');
  chatBody.prepend(commentBlock);
  commentBlock.innerHTML = `
  <div class="comment__header">
    <div class="comment__avatar-container">
      <img class="comment__avatar" src="${commentData.avatar}" alt="аватар">
      <h4 class="comment__name">${commentData.name}</h4>
    </div>

    <div class="comment__date">${commentData.date}</div>
  </div>

  <div class="comment__body">${commentData.comment}</div>
`;
}

//name
function createName() {
  if(nameInput.value) {
    return nameInput.value.trim()
      .toLowerCase()
      .split(/ /)
      .filter(item => item !== '')
      .map(item => item = item[0]
      .toUpperCase() + item.slice(1))
      .join(' ');

  } else {
   return 'Username';
  }
}

//avatar
function createAvatar() {
  // const regexp = /^https?:\/\/.+(.png|.jpg|.jpeg|.svg)$/;
  const regexp = /^https?:.+$/;
  const inputSrc = (avatarInput.value).trim();

  if (regexp.test(inputSrc)) {
    let img = new Image();
    img.src = inputSrc;

    if (img.width !== 0) {
      return inputSrc;
    } else {
      return getAvatar();
    }

  } else {
    return getAvatar();
  }
}

function getAvatar() {
  let n = Math.round(Math.random()*(avatarArr.length - 1));
  return avatarArr[n];
}

//date
function createCommentDate() {
  const date = new Date();

  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours =  String(date.getHours()).length === 1 ? String(date.getHours()).padStart(2, '0') : String(date.getHours());
  const minutes = String(date.getMinutes()).length === 1 ? String(date.getMinutes()).padStart(2, '0') : String(date.getMinutes());
  const seconds =  String(date.getSeconds()).length === 1 ? String(date.getSeconds()).padStart(2, '0') : String(date.getSeconds());

  return `${dayOfWeek}, ${day} ${month} ${year} в ${hours}:${minutes}:${seconds}`;
}

//comment
function createCommentText() {
  return checkSpam(commentInput.value);
}

function checkSpam(str) {
  const regexp = /viagra|xxx/ig;
  let strChecked;
  if (regexp.test(str)) {
    strChecked = str.replace(regexp, '***');
  } else {
    strChecked = str;
  }
  return strChecked;
}

// adding of a new comment
function addCommentToPage() {
  const name = createName();
  const avatar = createAvatar();
  const commentText = createCommentText();
  const date = createCommentDate();

  const commentData = { name, avatar, comment: commentText, date };
  comments.push(commentData);

  // draw comment on page
  createComment(commentData);

  // clear inputs
  nameInput.value = '';
  avatarInput.value = '';
  commentInput.value = '';
}


//event listener for adding comment
button.addEventListener('click', addCommentToPage);


//hide name field
const radios = document.querySelector('.inputs__radio-name-container');
radios.addEventListener('click', function(event) {
  const nameContainer = document.querySelector('.inputs__name-container');

  if (event.target.id === 'no') {
    nameContainer.style.display = 'none';
    nameInput.value = '';
  }
  if (event.target.id === 'yes') nameContainer.style.display = '';
})