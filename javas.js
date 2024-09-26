document.addEventListener('DOMContentLoaded', () => {
    preloadInitialDogImage();
    preloadInitialCatImage();
});

const initialDogImage = document.getElementById('initialDogImage');
const initialCatImage = document.getElementById('initialCatImage');
const contentFrame1 = document.getElementById('contentFrame1');

function preloadInitialDogImage() {

    initialDogImage.src = '63.gif';
    initialDogImage.style.borderRadius = '50%'
    
}

function preloadInitialCatImage() {

    initialCatImage.src = 'anya.gif';
    initialCatImage.style.borderRadius = '50%'; 
}


const dogBtn = document.getElementById('dogsGenerator');
const catBtn = document.getElementById('catsGenerator');
const quoteBtn = document.getElementById('quotesGenerator');
const contentFrame2 = document.getElementById('contentFrame2');
const contentFrame3 = document.getElementById('contentFrame3');

const borderSize = 160;

dogBtn.addEventListener('click', generateRandomDog);
catBtn.addEventListener('mouseover', generateRandomCat);
quoteBtn.addEventListener('click', generateRandomQuote);

function drawImageAnimation(img, borderSize) {
    let borderWidth = 0;
    const animationInterval = setInterval(() => {
        borderWidth += 2;
        img.style.border = `${borderWidth}px solid rgba(255, 255, 255, 0.397)`;

        if (borderWidth >= borderSize / 2) {
            clearInterval(animationInterval);
        }
    }, 50);
}

function generateRandomDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            const img = document.createElement('img');
            img.src = data.message;
            img.style.width = `${borderSize}px`;
            img.style.height = `${borderSize}px`;
            img.style.borderRadius = '50%';
            
            contentFrame1.innerHTML = '';
            contentFrame2.innerHTML = '';
            contentFrame3.innerHTML = '';
            
            contentFrame2.innerHTML = '';
            contentFrame2.appendChild(img);
            drawImageAnimation(img, borderSize);
        })
        .catch(error => {
            console.error('Error fetching dog content:', error.message);
        });
}

function generateRandomCat() {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => response.json())
        .then(data => {
            const img = document.createElement('img');
            img.src = data[0].url;
            img.style.width = `${borderSize}px`;
            img.style.height = `${borderSize}px`; 
            img.style.borderRadius = '50%';
            
            contentFrame1.innerHTML = '';
            contentFrame2.innerHTML = '';
            contentFrame3.innerHTML = '';

            contentFrame2.style.padding = '0';
            contentFrame3.style.padding = '0';

            contentFrame3.innerHTML = '';
            contentFrame3.appendChild(img);
            drawImageAnimation(img, borderSize);
        })
        .catch(error => {
            console.error('Error fetching cat content:', error.message);
        });
}


function generateRandomQuote() {
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            generateQuote(data.content, data.author,50)
        })
        .catch(error => {
            console.error('Error fetching quote content:', error.message);
        });
}


let still = false
async function generateQuote(content, author,speed) {
    if (still) {
        return
    }

    still = true
    contentFrame1.innerHTML = ''
    contentFrame2.innerHTML = ''
    contentFrame3.innerHTML = ''

    const text = `${content}\n\n - ${author}`
    const length = text.length

    for (let i=0; i < length; i++) {
        await new Promise((resolve,reject) => {
            setTimeout(() => {
                if (text[i] === "\n") {
                contentFrame1.innerHTML = `${contentFrame1.innerHTML}<br>`
                } else {
                contentFrame1.innerHTML = `${contentFrame1.innerHTML}${text[i]}`
                }
                resolve()
            },speed)
        })
    }
    still = false
    

}