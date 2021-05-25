const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const navList = document.getElementById('nav-list');



function toggleNav() {
    menuBars.classList.toggle('change');
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        overlay.classList.add('overlay-slide-right');
        overlay.classList.remove('overlay-slide-left');

        Array.from(navList.children).forEach((element, index) => {
            element.classList.remove(`slide-out-${index+1}`);
            element.classList.add(`slide-in-${index+1}`);
        });
    } else {
        overlay.classList.add('overlay-slide-left');
        overlay.classList.remove('overlay-slide-right');

        Array.from(navList.children).forEach((element, index) => {
            element.classList.remove(`slide-in-${index+1}`);
            element.classList.add(`slide-out-${index+1}`);
        });
    }
}
//Event Listeners
menuBars.addEventListener('click', toggleNav);
Array.from(navList.children).forEach((element) => {
    element.addEventListener('click', toggleNav);
});