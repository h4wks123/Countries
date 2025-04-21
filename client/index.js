let filter = "all";
let searchCountry = document.getElementById("filter-options-search__text");
let regionCountry = document.getElementById("filter-options-region");
searchCountry.addEventListener("change", (e) => {
  filter = e.target.value === "" ? "all" : `name/${e.target.value}`;
  handleCountryFetch(filter);
});
regionCountry.addEventListener("change", (e) => {
  filter = e.target.value === "" ? "all" : `region/${e.target.value}`;
  handleCountryFetch(filter);
});

function fetchCountriesData(filter) {
  return new Promise((resolve, reject) => {
    const url = `https://restcountries.com/v3.1/${filter}`;
    fetch(url, {
      mode: "no-cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network error, could not connect to countries endpoint"
          );
        }
        resolve(response.json());
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function displayCountriesCards(data) {
  let countriesContainer = document.getElementById("country-cards");
  let fragment = document.createDocumentFragment();

  countriesContainer.innerHTML = "";

  for (let index = 0; index < data.length; index++) {
    let card = document.createElement("div");
    card.className = "country-cards__paper";
    card.onclick = () => displayCountryData(data[index].name.common);
    card.innerHTML += `
        <img class="country-cards__paper-flag" loading="lazy" src="${data[index].flags.svg}" />
        <article class="country-cards__paper-details">
          <h4 class="country-cards__paper-details-name">${data[index].name.common}</h4>
          <h6 class="country-cards__paper-details-population"><p style="font-weight: bold;">Population: </p> ${data[index].population}</h6>
          <h6 class="country-cards__paper-details-region"><p style="font-weight: bold;">Region: </p> ${data[index].region}</h6>
          <h6 class="country-cards__paper-details-capital"><p style="font-weight: bold;">Capital: </p> ${data[index].capital}</h6>
        </article>
        `;
    fragment.appendChild(card);
  }

  countriesContainer.appendChild(fragment);
}

function handleCountryFetch(filter) {
  fetchCountriesData(filter)
    .then((data) => {
      displayCountriesCards(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("operations are now completed!");
    });
}

function changeTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.value);
  checkTheme();
}

function checkTheme() {
  if (localStorage.theme === "light") {
    document.body.classList = "light";
    document.getElementById("navigation-bar-right__button-mode").src =
      "./assets/dark-mode.svg";
    document.getElementById("navigation-bar-right__text").innerHTML =
      "Dark Mode";
    document.getElementById("filter-options-search__icon").src =
      "./assets/search-dark-mode.svg";
  } else {
    document.body.classList = "";
    document.getElementById("navigation-bar-right__button-mode").src =
      "./assets/light-mode.svg";
    document.getElementById("navigation-bar-right__text").innerHTML =
      "Light Mode";
    document.getElementById("filter-options-search__icon").src =
      "./assets/search-light-mode.svg";
  }
}

function displayCountryData(countryName) {
  location.href = `countries.html`;
  localStorage.setItem("countryData", countryName);
}

handleCountryFetch(filter);
checkTheme();
