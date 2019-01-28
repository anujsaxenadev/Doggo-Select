const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

//Getting Breeds List.
fetch('https://dog.ceo/api/breeds/list')
    .then(response => response.json())
    .then(data => data.message);