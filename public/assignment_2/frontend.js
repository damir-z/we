const submit = document.getElementById('submit');

submit.addEventListener('click', async () => {

    const cityInput = document.getElementById('city');
    const output = document.getElementById('output');

    const city = cityInput.value.trim();

    if(!city){
        output.textContent = "PLease write city!";
        return;
    }

    try{

        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if(response.ok){
            output.textContent = `${data.city}: ${data.temperature}°C, ${data.description}`;
        } else{
            output.textContent = data.error;
        }


    } catch(error){
        output.textContent = "Server error...";
    }
});