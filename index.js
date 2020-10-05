const API_ENDPOINT = 'http://api.giphy.com/v1/gifs/';
const API_KEY = 'DDLiQV0Jxw1Ks83GdntyUcGrR8qgReYs';
const GIF_LIMIT = 5;

const searchInput = document.getElementById('search');
const output = document.getElementById('output');
const loader = document.getElementById('loader');
const form = document.getElementById('form');
form.addEventListener('submit', function(event) { 
 event.preventDefault();
    console.log(form);

});

const turnOnLoader = () => {
    loader.style.display = "block";
}

const turnOffLoader = () => {
    loader.style.display = "none";
}

const debounce = (fn, timeout) => {
    let timer = null;
    return(...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args)
        }, timeout);
    }
}

const getRandomGifs = () => {
return fetch(`${API_ENDPOINT}trending?api_key=${API_KEY}&limit=${GIF_LIMIT}&q=${search}`)
    .then(res => res.json())
    .then(res => res.data);
};

const getTrendingGifs = () => {
    return fetch(`${API_ENDPOINT}trending?api_key=${API_KEY}&limit=${GIF_LIMIT}&q=${search}`)
        .then(res => res.json())
        .then(res => res.data);
}

const searchGifs = (search) => {

    
    return fetch(`${API_ENDPOINT}search?api_key=${API_KEY}&limit=${GIF_LIMIT}&q=${search}`)
        .then(res => res.json())
        .then(res => res.data)
        searchGifs.finnaly(() => {
            turnOffLoader();
        })
};

function renderGifs(gifs) {
    output.innerHTML = '';

gifs.forEach(({ images, title }) => {
    const { url } = images.original;

    output.insertAdjacentHTML('beforeend', `<img src=${url} alt=${title}>`);
    });
}

getTrendingGifs().then(renderGifs);

searchInput.addEventListener('input', (e) => {
    const {value} = searchInput;

    if(!value) {
    getTrendingGifs().then(renderGifs);
    return;
};

searchGifs(value).then(renderGifs);
});