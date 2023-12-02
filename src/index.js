import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const errorText = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');

errorText.style.display = 'none';
loaderEl.style.display = 'block';

fetchBreeds().then(breeds => {
  breeds.forEach(breed => {
    loaderEl.style.display = 'none';
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.add(option);
  });
}).catch(() => {
  showError();
});

breedSelect.addEventListener('change', () => {
     const selectedBreedId = breedSelect.value;
     showLoader();
  
     fetchCatByBreed(selectedBreedId)
       .then(catData => {
         const cat = catData[0];
         catInfoDiv.innerHTML = 
      `<div><img src="${cat.url}"></div>
      <div>
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p>Temperament: ${cat.breeds[0].temperament}</p>
      </div>
      `;
      loaderEl.style.display = 'none';
      catInfoDiv.style.display = 'flex';
      breedSelect.style.display = 'block';
  }).catch(() => {
    showError();
  })
});

function showError() {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  breedSelect.style.display = 'none';
  catInfoDiv.style.display = 'none';
  loaderEl.style.display = 'none';
}

function showLoader(){
  loaderEl.style.display = 'block';
  catInfoDiv.style.display = 'none';
  breedSelect.style.display = 'none';
}