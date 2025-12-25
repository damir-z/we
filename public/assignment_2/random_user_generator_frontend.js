const generate = document.getElementById('generate');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const gender = document.getElementById('gender');
const profilePicture = document.getElementById('profilePicture');
const age = document.getElementById('age');
const dateOfBirth = document.getElementById('dateOfBirth');
const city = document.getElementById('city');
const country = document.getElementById('country');
const userLocation = document.getElementById('userLocation');
const errorr = document.getElementById('errorr');

const capitalCity = document.getElementById('capitalCity');
const officialLanguage = document.getElementById('officialLanguage');
const currency = document.getElementById('currency');
const exchangeCurrencies = document.getElementById('exchangeCurrencies');
const flag = document.getElementById('flag');


const newsImage = document.getElementById('newsImage');
const newsTitle = document.getElementById('newsTitle');
const newsDescription = document.getElementById('newsDescription');
const newsURL = document.getElementById('newsURL');


generate.addEventListener('click', async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch('/generate');
        const data = await response.json();

        if (!response.ok) {
            errorr.textContent = data.error;
            return;
        }


        firstName.textContent = data.firstName;
        lastName.textContent = data.lastName;
        gender.textContent = data.gender;
        age.textContent = data.age;
        dateOfBirth.textContent = data.dateOfBirth;
        city.textContent = data.city;
        country.textContent = data.country;
        userLocation.textContent = `Location: ${data.city}, ${data.country}`;
        profilePicture.src = data.profilePicture;


        capitalCity.textContent = `Capital: ${data.capital}`;
        officialLanguage.textContent = `Official language: ${data.language}`;
        currency.textContent = `Currency: ${data.currency}`;
        flag.src = data.flag;

        exchangeCurrencies.textContent = `1 ${data.currentCurrencyCode} == 
         ${data.usdValue} USD ==  ${data.kztValue} KZT`;


        
         newsImage.src = data.newsImage;
         newsTitle.textContent = data.newsHeadline;
         newsDescription.textContent = data.newsDescription;
         newsURL.textContent = data.newsURL

    } catch (err) {
        errorr.textContent = "Server error...";
    }
});
