import axios from "axios";
export { fetchBreeds, fetchCatByBreed };

const API_KEY = "live_VkFiweUWaBqcJSkXlsHqny8993ZPySBgfKflOzO3F0P670MsDmvETevECmxPAgzq";
const BASE_URL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common["x-api-key"] = API_KEY;


function fetchBreeds() {
  return axios
    .get(`${BASE_URL}breeds`)
    .then(response => response.data)
    .catch(error => console.error(response.statusText));
};

function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => console.error(response.statusText));
};

