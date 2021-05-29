apiKey = 'DEMO_KEY'
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${10}`;

const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

let resultsArray = [1, 2, 3];
let favorites = {};

function showContent(page) {
    window.scrollTo({ top: 0, behaviour: 'instant' });
    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    } else {

        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }

    loader.classList.add('hidden');
}

function createDOMnodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    currentArray.forEach((result) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = "View full image";
        link.target = '_blank';
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA picture of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results') {
            saveText.textContent = 'Add to Favorites';
            saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
        } else {
            saveText.textContent = 'Remove Favorite';
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        const date = document.createElement('strong');
        date.textContent = result.date;
        const copyright = document.createElement('span');
        copyright.textContent = result.copyright === undefined ? '' : ` ${result.copyright}`;

        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

function updateDOM(page) {
    if (localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    imagesContainer.textContent = '';
    createDOMnodes(page);
    showContent(page);
}

async function getNasaPictures() {
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json()
        updateDOM('results');
    } catch (error) {
        console.log(error);
    }
}

function saveFavorite(itemUrl) {
    resultsArray.forEach(item => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            console.log(favorites);

            saveConfirmed.hidden = false;
            setTimeout(() => saveConfirmed.hidden = true, 2000);
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    });
}

function removeFavorite(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        updateDOM('favorites');
    }
}
// updateDOM();
getNasaPictures();