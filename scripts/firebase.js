import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyC0Uce5gDw8Kph3Mc9wyGw2rp78tMzGLQM",
    authDomain: "contactform-5bd77.firebaseapp.com",
    databaseURL: "https://contactform-5bd77-default-rtdb.firebaseio.com",
    projectId: "contactform-5bd77",
    storageBucket: "contactform-5bd77.appspot.com",
    messagingSenderId: "320149824441",
    appId: "1:320149824441:web:0fe8786386157b862c4c68",
    measurementId: "G-YGZ913M2EH"
};
const app = initializeApp(firebaseConfig)

async function writeUserData(userId, lat, long, ph, ec, turb, tds, dO, bod, cod, sulphate, sodium, phosphate, chloride, ammonia, nitrate, th, ta) {
    const db = getDatabase();
    set(ref(db, `${userId}`), {
        latitude: lat,
        longitude: long,
        pH: ph,
        electrical_conductivity: ec,
        turbidity: turb,
        total_dissolved_solids: tds,
        dissolved_oxygen: dO,
        BOD: bod,
        COD: cod,
        sulphate: sulphate,
        sodium: sodium,
        phosphate: phosphate,
        chloride: chloride,
        ammonia: ammonia,
        nitrate: nitrate,
        total_hardness: th,
        total_alkalinity: ta
    });
}

let form = document.getElementById('form')
let counter = 0
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let lat = document.getElementById('latitude').value
    let long = document.getElementById('longitude').value

    let ph = document.getElementById('ph').value
    let ec = document.getElementById('EC').value

    let turb = document.getElementById('turbidity').value
    let tds = document.getElementById('TDS').value

    let dO = document.getElementById('DO').value
    let bod = document.getElementById('BOD').value

    let cod = document.getElementById('COD').value
    let sulphate = document.getElementById('sulphate').value

    let sodium = document.getElementById('sodium').value
    let phosphate = document.getElementById('phosphate').value

    let chloride = document.getElementById('chloride').value
    let ammonia = document.getElementById('ammonia').value

    let nitrate = document.getElementById('nitrate').value
    let th = document.getElementById('TH').value

    let ta = document.getElementById('TA').value
    counter++

    writeUserData(counter, lat, long, ph, ec, turb, tds, dO, bod, cod, sulphate, sodium, phosphate, chloride, ammonia, nitrate, th, ta)
})