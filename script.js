const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader'); 

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];
let isInitialLoad = true;


// Unsplash API

let initialCount = 5;
const apiKey = `13vPZKQS9jclvCWkxUKaKyP9IJHwAFkPe20hCCmXZ-U`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey }&count=${initialCount}`;


function updateAPIURLWithNewCount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey }&count=${picCount}`;
}
//Check if all images are loaded

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    } 
}

//Helper to Set attributes on the DOM Elements
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for the DOM based on Data from API

function displayPhotos() {
    imagesLoaded=0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> element with the pic
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <a> element with the pic
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener if image is loaded
        img.addEventListener('load',imageLoaded());
        //Put <img> inside <a>, then put them in Image Container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
};

// Get Photos from Unsplash

async function getPhotos(){

    try {
        const response = await fetch(apiUrl);
       photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {

            updateAPIURLWithNewCount(25);
            isInitialLoad = false;
        }
    }
    catch (error) {
        //Catch Error
    }


}

// Check if Scrolling in the page to load more photos
window.addEventListener('scroll',() => {
    if (window.innerHeight+window.scrollY > document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//On load
getPhotos();