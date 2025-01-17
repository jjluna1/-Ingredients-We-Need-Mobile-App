//Linking html and Javascript by declaring and assigning variables

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


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

  clearInputFieldEl() //clears the input when button is pushed
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
        
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
    }
    } else {
      shoppingListEl.innerHTML = "We don't need any groceries...yet."
    }
    
})

function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = itemValue

  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)

  })

  shoppingListEl.append(newEl)
}