const url = "https://apis.ccbp.in/countries-data";
console.log(url)
let countryList = document.getElementById('resultCountries');
let searchInput = document.getElementById('searchInput');
let spinner=document.getElementById('spinner');
function loadCountries(countryData) {
    countryList.innerHTML = "";
    countryData.map(country => {
        let countryCard = document.createElement('div');
        countryCard.classList.add("country-card","col-11","col-md-5","mr-auto","ml-auto","d-flex","flex-row");

        let countryFlag = document.createElement('img');
        countryFlag.src = country.flag;
        countryFlag.classList.add('country-flag',"mt-auto","mb-auto");

        let countryNameContainer = document.createElement('div');
        countryNameContainer.classList.add("d-flex","flex-column","ml-4");

        let countryName = document.createElement('p');
        countryName.appendChild(document.createTextNode(country.name));
        countryName.classList.add('country-name');

        let countryPop = document.createElement('p');
        countryPop.appendChild(document.createTextNode(country.population));
        countryPop.classList.add('country-population');

        countryCard.appendChild(countryFlag);
        countryNameContainer.appendChild(countryName);
        countryNameContainer.appendChild(countryPop);
        countryCard.appendChild(countryNameContainer);

        countryList.appendChild(countryCard);
    })
}

async function getCountryData() {

    spinner.classList.remove("d-none");
    let countryDataFetch = await fetch(url, {
        method: "GET",
    });
    spinner.classList.add("d-none");
    let countryData = await countryDataFetch.json();
    loadCountries(countryData);
    searchInput.addEventListener("keyup", (key) => {
        console.log(key);
        let val = searchInput.value;
        let newCountryData = countryData.filter(data => {
            return data.name.includes(val);
        });
        // console.log(newCountryData);
        console.log(val);
        if(val!==""){
             loadCountries(newCountryData);
        }
        else{
            loadCountries(countryData);
        }
    });
}

getCountryData();