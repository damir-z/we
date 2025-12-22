const generate = document.getElementById('generate');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const gender = document.getElementById('gender');
const profilePicture = document.getElementById('profilePicture');
const age = document.getElementById('age');
const dateOfBirth = document.getElementById('dateOfBirth');
const city = document.getElementById('city');
const country = document.getElementById('country');
const location = document.getElementById('location');
const errorr = document.getElementById('error');


generate.addEventListener('click', async (event) => {
    try{
        const response = await fetch('/generate');
        const data = await response.json();

        if (!response.ok) {
            error.textContent = data.error;
            return;
        }

        firstName.textContent = data.firstName;
        lastName.textContent = data.lastName;
        gender.textContent = data.gender;
        age.textContent = data.age;
        dateOfBirth.textContent = data.dateOfBirth;
        city.textContent = data.city;
        country.textContent = data.country;
        location.textContent = data.location;
        profilePicture.src = data.profilePicture;
    }catch(error){
        errorr.textContent = "Server error...";
    }
});
