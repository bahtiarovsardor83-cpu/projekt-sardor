const container = document.getElementById("countriesContainer");
const searchInput = document.getElementById("searchInput");
const darkModeToggle = document.getElementById("darkModeToggle");

let countriesData = [];

// Fetch countries
fetch("https://restcountries.com/v3.1/all?fields=name,flags")
    .then(response => response.json())
    .then(data => {
        countriesData = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );
        displayCountries(countriesData);
    })
    .catch(error => {
        container.innerHTML = "<p>Error loading countries</p>";
        console.error(error);
    });

function displayCountries(countries) {
    container.innerHTML = "";

    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");

        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;

        container.appendChild(card);
    });
}

// Search
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(value)
    );
    displayCountries(filtered);
});

// Dark mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});