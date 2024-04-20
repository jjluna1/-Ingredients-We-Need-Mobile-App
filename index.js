//Linking html and Javascript by declaring and assigning variables
const addBtn = document.getElementById("add-button")

const inputFieldEl = document.getElementById("input-field")

//creating event listener so when button is clicked, the text in input field is console.loged
addBtn.addEventListener("click", function(){
  let inputValue = inputFieldEl.value

  console.log(inputValue)
})