const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log(`Looks like there was an error! | ${error}`));
}

fetchData('https://dog.ceo/api/breeds/list')
    .then(data => settingBreeds(data.message))
    .then(fetchBreedImage);

function settingBreeds(data){
    //Generating Breeds
    const options = data.map(breed => `<option>${breed}</option>`).join('');
    select.innerHTML = options;
}

function checkStatus(response){
    if(response.ok == true){
        return Promise.resolve(response);
    }
    else{
        return Promise.reject(new Error(response.statusText));
    }
}

function fetchBreedImage(){
    const breed = select.value;

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            let card = `
                <img src="${data.message}" alt="${breed}"></img>
                <p>Click to view more <b>${breed}s</b></p>
            `;
            document.querySelector(".card").innerHTML = card;
        });
}

select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);