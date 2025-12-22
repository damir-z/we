const form = document.getElementById('bmiForm');
const result = document.getElementById('result');
const category = document.getElementById('category');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // ⬅ КЛЮЧЕВОЙ МОМЕНТ

    const formData = new FormData(form);

    const response = await fetch('/bmi', {
        method: 'POST',
        body: new URLSearchParams(formData)
    });

    const data = await response.json();

    if (response.ok) {
        result.textContent = `Your BMI is ${data.bmi}`;
        if(data.category == "Underweight"){
            category.textContent = `Category ${data.category}`;
            category.style.color = "blue";
        }else{
            category.textContent = `Category ${data.category}`;
            category.style.color = "green";
        }
    } else {
        result.textContent = data.error;
    }
});
