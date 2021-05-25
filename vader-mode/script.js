const toggleSwitch = document.querySelector('input[type="checkbox"');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');
const mtitle = document.getElementById('main-title');
const stitle = document.getElementById('secondary-title');

//Vader Mode styles
function vaderMode() {
    nav.style.background = 'rgb(16 16 16 /75%)'
    textBox.style.background = 'rgb(255 255 255 /50%)';
    toggleIcon.children[0].textContent = 'Vader Mode';
    toggleIcon.children[1].classList.replace('fa-jedi-order', 'fa-first-order');
    mtitle.textContent = 'Execute Order 66';
    stitle.textContent = 'The Dark Side Is In Our Blood!';
    image1.src = "./img/vader1.jpg";
    image2.src = "./img/vader2.jpg";
    image3.src = "./img/vader3.jpg";
}

//Jedi Mode styles
function jediMode() {
    nav.style.background = 'rgb(255 255 255 /75%)'
    textBox.style.background = 'rgb(0 0 0 /50%)';
    toggleIcon.children[0].textContent = 'Jedi Mode';
    toggleIcon.children[1].classList.replace('fa-first-order', 'fa-jedi-order');
    mtitle.textContent = 'Hello there';
    stitle.textContent = 'I have the high ground!';
    image1.src = "./img/Investing_light.png";
    image2.src = "./img/Map_dark_light.png";
    image3.src = "./img/Segment_analysis_light.png"
}

function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'vader');
        localStorage.setItem('theme', 'vader');
        vaderMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'jedi');
        localStorage.setItem('theme', 'jedi');
        jediMode();
    }
}
//Event listener
toggleSwitch.addEventListener('change', switchTheme);

//check localstorage for theme
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    if (currentTheme === 'vader') {
        document.documentElement.setAttribute('data-theme', currentTheme);
        toggleSwitch.checked = true;
        vaderMode();
    } else {
        document.documentElement.setAttribute('data-theme', currentTheme);
        toggleSwitch.checked = false;
        jediMode();
    }

}