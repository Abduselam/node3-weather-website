const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = `/weather?address= ${location}`
    messageOne.textContent = "Loading..."
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ""
        } else {
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
        }
        
    })
})

})