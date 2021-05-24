const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const count = 10;
const apiKey = 'HDOw71bolLkd0nluBQYX3HpdUfN1MYvEWsKZLxFI61A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// const apiUrl = './photos.json';

//helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
//count no. of images loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Create elems for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    loader.hidden = false;
    photosArray.forEach(photo => {
        //Create <a> to link to unsplah
        const item = document.createElement('a');
        setAttributes(item, {
                href: photo.links.html,
                target: '_blank'
            })
            //Create <img> for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.small,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event listener check for finished loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get Photos from Unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {}
}

//Check for near bottom of page
getPhotos();
window.addEventListener("scroll", (event) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});