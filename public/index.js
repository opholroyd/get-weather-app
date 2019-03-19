const submitButton = document.getElementById('submitButton');
const input = document.getElementById('weatherInput');
const messageOne = document.getElementById('one');
const messageTwo = document.getElementById('two');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
   
    let location = input.value;
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})