// Массив комментариев
let comments = [];

// HTML-элементы
const button = document.querySelector('.inputs__button');
const chat = document.querySelector('.display');
const nameInput = document.querySelector('.inputs__name-input');
const avatarInput = document.querySelector('.inputs__avatar-input');
const commentInput = document.querySelector('.inputs__comment-input');

// Функция для создания HTML-кода комментария
function createComment(commentData) {
  const commentBlock = document.createElement('div');
  commentBlock.classList.add('comment');
  chat.append(commentBlock);
  commentBlock.innerHTML = `
    <div class="comment__header">
      <div class="comment__avatar-container">
        <img class="comment__avatar" src="${commentData.avatar}" alt="аватар">
        <h4 class="comment__name">${commentData.name}</h4>
      </div>
      <div class="comment__date">${commentData.date}</div>
    </div>
    <div class="comment__body">${commentData.comment}</div>`;
}

// Функция для добавления комментария в массив и отрисовки на странице
function addCommentToPage() {
  const name = nameInput.value.trim() || 'Username';
  const avatar = avatarInput.value.trim() || 'assets/img/icons/default-avatar.png';
  const commentText = commentInput.value.trim();

  // Добавляем комментарий в массив
  const date = getCurrentDate();
  const commentData = { name, avatar, comment: commentText, date };
  comments.push(commentData);

  // Отрисовываем комментарий на странице
  createComment(commentData);

  // Очищаем поля ввода
  nameInput.value = '';
  avatarInput.value = '';
  commentInput.value = '';
}

// Функция для получения текущей даты в формате "День, Дата Месяц Год в Часы:Минуты:Секунды"
function getCurrentDate() {
  const date = new Date();
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${dayOfWeek}, ${day} ${month} ${year} в ${hours}:${minutes}:${seconds}`;
}

// Обработчик события для кнопки отправки комментария
button.addEventListener('click', addCommentToPage);