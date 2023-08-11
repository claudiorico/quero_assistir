const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("imovie-name");
const movieYear = document.getElementById("imovie-year");

async function searchButtonClickHandler() {
    overlay.classList.add("open");
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName.value
      .split(" ")
      .join("+")}&${movieYear.value}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log('data', data);
}

searchButton.addEventListener("click", searchButtonClickHandler);
