

let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');
let section = document.querySelector('section');


menuToggle.onclick = function(){
    header.classList.toggle('active')
    section.classList.toggle('active')
}