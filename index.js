//Linking html and Javascript by declaring and assigning variables

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL: "https://playground-8c855-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

//creating event listener so when button is clicked, the text in input field is console.loged
addBtn.addEventListener("click", function(){
  let inputValue = inputFieldEl.value

  push(shoppingListInDB, inputValue)

  inputFieldEl.value = "" //clears the input when button is pushed
  shoppingListEl.innerHTML += `<li>${inputValue}</li>` // adds input value into new <li> element in html

})