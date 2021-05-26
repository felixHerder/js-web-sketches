const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const linkForm = document.getElementById('link-form');
const webNameEl = document.getElementById('website-name');
const webUrlEl = document.getElementById('website-url');
const linkContainer = document.getElementById('links-container');
const submitBtn = document.getElementById('submit-button');
const spinner = document.querySelector('.fa-spinner')

//Show modal, focus on input
function showModal() {
    spinner.style.display = 'none';
    modal.classList.add('show-modal');
    webNameEl.parentElement.hidden = true;
    webNameEl.value = '';
    webUrlEl.value = '';
    submitBtn.disabled = true;
    webUrlEl.focus();
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);

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

function storeLink(e) {
    e.preventDefault();
    const nameValue = webNameEl.value;
    let urlValue = webUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
}


linkForm.addEventListener('submit', storeLink);


























// fetchTitle('wikipedia.com').then(console.log);

// const weburl = document.getElementById('website-url');
// const webname = document.getElementById('website-name');

// weburl.addEventListener('focusout', (e) => {
//     fetchTitle(e.target.value).then(t => { webname.value = t });
// });