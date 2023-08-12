const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("imovie-name");
const movieYear = document.getElementById("imovie-year");
const movieListContainer = document.getElementById("movie-list");

let movieList = [];

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}&${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    createModal(data);
    overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido.");
  }
  return `&y=${movieYear.value}`;
}

function addToList(data) {
  if (isFilmAlredyOnTheList(data.imdbID)){
    notie.alert({ type: "error", text: 'Filme já esta na Lista' });
    return;
  }
  movieList.push(data);
  updateUI(data);
  overlay.classList.remove("open");
}

function updateUI(data) {
  movieListContainer.innerHTML += `
  <article>
    <img src="${data.Poster}" alt="Poster do ${data.Title}">
    <button class="remove-button"><i class="bi bi-trash"></i>Remover</button>
  </article>`;
}

function isFilmAlredyOnTheList(imdbId){
  function isThisIdFromThisMovie(movie){
    return movie.imdbID === imdbId;
  }
  return movieList.find(isThisIdFromThisMovie);
}

searchButton.addEventListener("click", searchButtonClickHandler);