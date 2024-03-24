'use strict'
import {heros} from './heros.js';

document.addEventListener('DOMContentLoaded', () => {
  //draw contents on page
  const galleryContainer = document.querySelector('.gallery__container');

  function drawContents(obj) {
    let div = document.createElement('div');
    div.className = 'gallery__item item';
    galleryContainer.append(div);

    const savedRating = localStorage.getItem(`${obj.name}`) ? localStorage.getItem(`${obj.name}`) : 0;

    div.innerHTML = `
    <h3 class="item__title name">${obj.name}</h3>
    <p class="item__paragraph">Вселенная: <span class="universe">${obj.universe}</span></p>
    <p class="item__paragraph">Альтер-эго: <span class="alterego">${obj.alterego}</span></p>
    <p class="item__paragraph">Род деятельности: <span  class="occupation">${obj.occupation}</span></p>
    <p class="item__paragraph">Друзья: <span class="friends">${obj.friends}</span></p>
    <p class="item__paragraph">Суперсилы: <span class="superpowers">${obj.superpowers}</span></p>
    <div class="item__img-container">
      <img class="item__img url" src="${obj.url}">
    </div>
    <div class="item__rating rating">
      <div class="rating__body">
        <div class="rating__active"></div>
        <div class="rating__items">
          <input type="radio" class="rating__item" value="1" name="rating">
          <input type="radio" class="rating__item" value="2" name="rating">
          <input type="radio" class="rating__item" value="3" name="rating">
          <input type="radio" class="rating__item" value="4" name="rating">
          <input type="radio" class="rating__item" value="5" name="rating">
        </div>
      </div>
      <div class="rating__value">${savedRating}</div>
    </div>
    <button class="item__btn">Подробнее</button>
    <div class="item__popup">Информация: <span class="info">${obj.info}</span></div>`;
  }

  heros.forEach(obj => drawContents(obj));

  // ----------------------------------------------------------------------

  //activate / deactivate popup
  const btns = galleryContainer.querySelectorAll('.item__btn');

  btns.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.nextElementSibling;
    popup.classList.toggle('active');
  }))

  const popups = galleryContainer.querySelectorAll('.item__popup');
  popups.forEach(popup => popup.addEventListener('click', () => {
    popup.classList.remove('active');
  }))

  // ----------------------------------------------------------------------

  // star-ranking
  const ratings = document.querySelectorAll('.rating');

  if(ratings.length > 0) {
    initRatings();
  }

  //main rating initiation function
  function initRatings() {
    let ratingActive; // active stars
    let ratingValue; // value in paragraph near the stars

    for (let i = 0; i < ratings.length; i++) {
      const rating = ratings[i];
      initRating(rating); // initialize every rating on page
    }

    function initRating(rating) {
      initVariables(rating);
      setRatingActiveWidth();
      if(rating.classList.contains('rating')) {
        setRating(rating);
      }
    }

    // function that sets variables for every rating
    function initVariables(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }

    // function that rates (rating.value on default)
    function setRatingActiveWidth (i = ratingValue.innerHTML) {
      const ratingActiveWidth = i / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    // function that allows set rating by hand
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item'); // all ratings on page

      for (let i = 0; i < ratingItems.length; i++) {
        const ratingItem = ratingItems[i];
        const heroName = ratingItem.closest('.item').firstElementChild.textContent;

        // possibility to change rating with moseover + update local storage
        // ratingItem.addEventListener('mouseenter', function() {
        //   initVariables(rating); // update variables ratingActive and ratingValue for every item
        //   setRatingActiveWidth(ratingItem.value); // update current value
        //   const ratingActiveWidth = ratingActive.style.width;
        //   const ratingCurrentValue = parseInt(ratingActiveWidth) * 0.05;
        //   ratingValue.textContent = ratingCurrentValue;
        //   localStorage.setItem(heroName, ratingCurrentValue);
        // });

        // possibility to change rating on mouseleave
        // ratingItem.addEventListener('mouseleave', function() {
        //   setRatingActiveWidth(); // update current value
        // });

        // set rating on click + update local storage
        ratingItem.addEventListener('click', function() {
          initVariables(rating);
          const ratingActiveWidth = ratingActive.style.width;
          const ratingCurrentValue = parseInt(ratingActiveWidth) * 0.05; // value of already activated inputs
          const newRatingValue = +ratingItem.value; // value of input clicked

          // if the rating "1" is clicked again, reset the rating to 0
          if (ratingCurrentValue === 1 && ratingCurrentValue === newRatingValue) {
            ratingValue.textContent = 0;
            ratingActive.style.width = '0%'; // reset active rating width
            localStorage.removeItem(heroName);
          } else {
            setRatingActiveWidth(newRatingValue);
            ratingValue.textContent = newRatingValue;
            localStorage.setItem(heroName, newRatingValue);
          }
        });
      }
    }
  }
})
