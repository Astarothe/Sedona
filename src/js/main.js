var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var navNojs = document.querySelector('nav');
var navToggleClosed = document.querySelector('.main-nav__toggle--closed');

navNojs.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed'
)) {
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
} else {
  navMain.classList.add("main-nav--closed");
  navMain.classList.remove("main-nav--opened");
}
});
navToggleClosed.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed'
)) {
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
} else {
  navMain.classList.add("main-nav--closed");
  navMain.classList.remove("main-nav--opened");
}
});
