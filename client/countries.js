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
    document.getElementById("back__icon").src = "./assets/back-dark-mode.svg";
  } else {
    document.body.classList = "";
    document.getElementById("navigation-bar-right__button-mode").src =
      "./assets/light-mode.svg";
    document.getElementById("navigation-bar-right__text").innerHTML =
      "Light Mode";
    document.getElementById("back__icon").src = "./assets/back-light-mode.svg";
  }
}

function fetchCountryData() {
  return new Promise((resolve, reject) => {
    const url = `https://restcountries.com/v3.1/name/${localStorage.countryData}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network error, could not connect to ${localStorage.countryData}`
          );
        }
        resolve(response.json());
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function displayCountryData(data) {
  let countryImage = document.getElementById("country__paper-flag");
  let countryName = document.getElementById("country-details__country-name");
  let countryNativeName = document.getElementById(
    "country-details__native-name"
  );
  let countryPopulation = document.getElementById(
    "country-details__population"
  );
  let countryRegion = document.getElementById("country-details__region");
  let countrySubRegion = document.getElementById("country-details__sub-region");
  let countryCapital = document.getElementById("country-details__capital");
  let countryTopLevelDomain = document.getElementById(
    "country-details__top-level-domain"
  );
  let countryCurrencies = document.getElementById(
    "country-details__currencies"
  );
  let countryLanguages = document.getElementById("country-details__languages");

  console.log(data);
  countryImage.src = `${data[0].flags.svg}`;
  countryName.innerHTML += `${data[0].name.common}`;
  countryNativeName.innerHTML += `${data[0].name.nativeName.eng.common}`;
  countryPopulation.innerHTML += `${data[0].population}`;
  countryRegion.innerHTML += `${data[0].region}`;
  countrySubRegion.innerHTML += `${data[0].subregion}`;
  countryCapital.innerHTML += `${data[0].capital}`;
  countryCurrencies.innerHTML += `${data[0].currencies}`;
  countryLanguages.innerHTML += `${Object.values(data[0].languages).join(
    ", "
  )}`;
}

function navigateHomePage() {
  location.href = "index.html";
}

fetchCountryData()
  .then((data) => {
    displayCountryData(data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log(
      `operations for ${localStorage.countryData} are now completed!`
    );
  });

checkTheme();
