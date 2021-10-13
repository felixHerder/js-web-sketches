const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const linkForm = document.getElementById('link-form');
const webNameEl = document.getElementById('website-name');
const webUrlEl = document.getElementById('website-url');
const linkContainer = document.getElementById('links-container');
const submitBtn = document.getElementById('submit-button');
const spinner = document.querySelector('.fa-spinner');

let links = [];

//Show modal, focus on input
function showModal() {
    spinner.style.display = 'none';
    modal.classList.add('show-modal');
    webNameEl.parentElement.hidden = true;
    linkForm.reset();
    submitBtn.disabled = true;
    webUrlEl.focus();
}

modalShow.addEventListener('click', showModal);
//hide modal
modalClose.addEventListener('mousedown', () => modal.classList.remove('show-modal'));
window.addEventListener('mousedown', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);

//auto populate website name
const proxyUrl = 'https://cors.bridged.cc/';

async function fetchTitle(linkUrl) {
    try {
        const promise = await fetch(proxyUrl + linkUrl);
        const rawhtml = await promise.text();
        const html = (new DOMParser()).parseFromString(rawhtml, 'text/html');
        return html.querySelector('title').textContent;

    } catch (error) {
        console.log('error geting title:', error);
        return 'unknown';
    }
}
//validate url field on focusout
webUrlEl.addEventListener('change', async() => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!webUrlEl.value.match(regex)) {
        webUrlEl.setCustomValidity('Invalid url');
        webUrlEl.reportValidity();
    } else {
        webUrlEl.setCustomValidity('');
        webNameEl.parentElement.hidden = false;
        webNameEl.placeholder = "looking for name..."
        spinner.style.display = 'block';

        webNameEl.value = await fetchTitle(webUrlEl.value);

        spinner.style.display = 'none';
        submitBtn.disabled = false;
        webNameEl.placeholder = ""

    }
});

//create item card
function createItem(webname, weburl) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.setAttribute('weburl', weburl);
    linkContainer.appendChild(item);

    const closebtn = document.createElement('i');
    closebtn.classList.value = ('far fa-window-close');
    closebtn.tagName = 'delete-link';
    closebtn.title = 'delete link';
    //remove item 
    closebtn.addEventListener('click', (e) => {
        links = links.filter(elem => elem.url != weburl);
        e.target.parentElement.remove();
        localStorage.setItem('links', JSON.stringify(links));
    });
    item.appendChild(closebtn);

    const name = document.createElement('div');
    name.classList.add('name');
    item.appendChild(name);

    const img = document.createElement('img');
    img.src = "https://www.google.com/s2/favicons?domain=" + weburl;
    img.alt = 'favicon';
    name.appendChild(img);

    const link = document.createElement('a');
    link.href = weburl;
    link.title = webname;
    link.textContent = webname;
    link.target = "_blank";
    name.appendChild(link);
}

//load links from local storage
function loadLinks() {
    if (localStorage.getItem('links')) {
        links = JSON.parse(localStorage.getItem('links'));
    } else {
        //default links
        links = [{ name: 'Unsplash', url: 'https://unsplash.com' },
            { name: 'reddit: the front page of the internet', url: 'https://reddit.com' },
            { name: 'DuckDuckGo — Privacy, simplified.', url: 'https://duckduckgo.com' },
            { name: 'IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows', url: 'https://imdb.com' },
            { name: 'Dribbble - Discover the World’s Top Designers & Creative Professionals', url: 'https://dribbble.com/' },
            { name: 'Build the portfolio you need to be a badass web developer. | egghead.io', url: 'https://egghead.io/' },
            { name: 'Metacritic - Movie Reviews, TV Reviews, Game Reviews, and Music Reviews', url: 'https://www.metacritic.com/' },
        ];

        localStorage.setItem('links', JSON.stringify(links));
    }
    //poulate  iteams from links
    links.forEach(element => {
        createItem(element.name, element.url);
    });
}

//store links
function storeLink(e) {
    e.preventDefault();
    const nameValue = webNameEl.value;
    let urlValue = webUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    const link = {
        name: nameValue,
        url: urlValue
    }
    links.push(link);
    localStorage.setItem('links', JSON.stringify(links));
    createItem(nameValue, urlValue);
    //reset form
    // webNameEl.parentElement.hidden = true;
    // linkForm.reset();
    // submitBtn.disabled = true;
    // webUrlEl.focus();
    modal.classList.remove('show-modal');
}

loadLinks();
linkForm.addEventListener('submit', storeLink);