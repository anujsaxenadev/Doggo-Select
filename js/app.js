const select = document.querySelector('#breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');
const messageDiv = $('#message');

messageDiv.hide();

// Wrapper Function on the Fetch method with Error Handeling
function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log(`Looks like there was an error! | ${error}`));
}

// Function for fetching the Breed List
fetchData('https://dog.ceo/api/breeds/list')
    .then(data => settingBreeds(data.message))
    .then(fetchBreedImage);

// Function for setting up Breeds Options
function settingBreeds(data){
    const options = data.map(breed => `<option>${breed}</option>`).join('');
    select.innerHTML = options;
}

// Function for Checking the status of the Response
function checkStatus(response){
    if(response.ok == true){
        return Promise.resolve(response);
    }
    else{
        return Promise.reject(new Error(response.statusText));
    }
}

// Function for fetching the Breed Image according to the Selected Breed
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

// Function for Posting the Data
function postData(e){
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const comment = document.querySelector('#comment').value;
    const body = {
        name: name,
        comment: comment,
    }
    const config = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body : JSON.stringify(body)
    }
    fetch('https://jsonplaceholder.typicode.com/comments', config)
        .then(checkStatus)
        .then(data => displayMessage(data))
}

// Function for Displaying message.
function displayMessage(data){
    const flag = data.ok;
    const message = `
        <div class="alert alert-${flag ? 'success' : 'danger'}">
            <strong>${flag ? 'Comment Posted! : ' : 'Error in Posting : '}</strong>
            ${flag ? 'Thanks for your Comment.': "Your Comment can't be Posted. Please contact to Customer Care."}
        </div>
    `;
    messageDiv.html(message);
    messageDiv.fadeIn("slow").delay(2000).slideUp();    
}

// Event Listeners for changing the Image
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);

// Event Listener for Posting Data
form.addEventListener('submit',postData);