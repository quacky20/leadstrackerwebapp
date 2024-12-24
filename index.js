import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, 
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-96f09-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refInDB =  ref(database, "leads")

const inputEl = document.getElementById("inputEl")
const inputBtn = document.getElementById("inputBtn")
const ulEL = document.getElementById("ulEl")
const deleteBtn = document.getElementById("deleteBtn")


function render(leads){
    let listItem = ""

    for (let i = 0; i<leads.length; i++){
        // listItem += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItem += `
        <li>
            <a target = '_blank' href = '${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `
    }

    ulEL.innerHTML = listItem
}

onValue(refInDB, function(snapshot){
    const snapshotExists = snapshot.exists()
    if (snapshotExists){
        const snapshotVal = snapshot.val()
        const leads = Object.values(snapshotVal)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function(){
    remove(refInDB)
    ulEL.innerHTML = ""
})

inputBtn.addEventListener("click", function(){
    if (inputEl.value != ""){
        push(refInDB, inputEl.value)
        inputEl.value = ""
    }
})