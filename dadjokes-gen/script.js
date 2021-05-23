const jokeContainer = document.getElementById('joke-container');
const setupText = document.getElementById('setup');
const punchlineText = document.getElementById('pline');
const twitterButton = document.getElementById('twitter');
const newJokeButton = document.getElementById('new-joke');
const loader = document.getElementById('loader');



function loading() {
    loader.style.display = "block";
    jokeContainer.style.display = "none";
}

function doneloading() {
    loader.style.display = "none";
    jokeContainer.style.display = "block";
}

async function getJoke() {

    //api repo https://github.com/KegenGuyll/DadJokes_API
    const apiUrl = 'https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes';
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&&lang=en&format=json';
    try {
        loading()
        const response = await fetch(apiUrl);
        const data = await response.json();

        //check for blank punchline
        if (data.punchline === '')
            punchlineText.innerText = 'unknown'
        else
            punchlineText.innerText = data.punchline;

        //reduce font-size for long setpus
        if (data.setup.length > 50)
            setupText.classList.add('long-setup');
        else
            setupText.classList.remove('long-setup');
        setupText.innerText = data.setup;
        doneloading();
    } catch (error) {
        console.log('error getting joke:', error);
    }
}

//Tweet joke
function tweetJoke() {
    const setup = setupText.innerText;
    const punchline = punchlineText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${setup} - ${punchline}`;
    window.open(twitterUrl, '_blank');
}
//Event listeners
newJokeButton.addEventListener('click', getJoke);
twitterButton.addEventListener('click', tweetJoke);


getJoke();