'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const showModals = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < showModals.length; i++)
  showModals[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* on line 11 and 12 while giving a className to method don't use the .className bcz here we are not selecting and class instead we are just giving the className to a method. 

while calling function on line 20,22,23 we don't use the paranthesis bcz we we use () it means that as soon as that line encounters the js will call that function

but here we wan't is when the button is click then only that event to happen so we don't use the the ()

on line 24 we use document.addEventListener bcz keyEvent is a global event.
when keyDown occurs the js passed the event object which contain all the info about the event to the function as an argument and using that event object we can get any info about event you can check it using console.log(event)

note we dont pass the event object its js we are just defining funct its js who passed that object when the  event occur.
------------------------------------------------------------------------------------
*/
