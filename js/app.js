const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

//Getting Breeds List.
fetch('https://dog.ceo/api/breeds/list')
    .then(response => response.json())
    .then(data => settingOptions(data.message))
    .then(fetchDogImage);

function fetchDogImage(){
    fetch(`https://dog.ceo/api/breed/${select.value}/images/random`)
        .then(image => image.json())
        .then((url) => {
            card.innerHTML = `
                                <img src="${url.message}"></img>
                                <p>Click to view more Images of <b>${select.value}</b></p>
                            `;
        });
}

function settingOptions(data){
    //Generating Breeds
    const options = data.map(breed => `<option>${breed}</option>`).join('');
    select.innerHTML = options;
}

select.addEventListener('change', fetchDogImage);
card.addEventListener('click', fetchDogImage);