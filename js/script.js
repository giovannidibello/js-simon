// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

// seleziono gli elementi del dom dalla pagina
const countDown = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const answersForm = document.getElementById("answers-form");
const numbersForm = document.querySelectorAll(".form-control");
const button = document.querySelector("button");
const message = document.getElementById("message");

// setto i secondi di partenza
let seconds = 30;
countDown.innerText = seconds;

// invoco la funzione del countdown
setInterval(creoCountdown, 1000);

// invoco la funzione dei numeri random
estraiNumero();

// salvo l'array ritornato dalla funzione estraiNumero
const numbersRandom = estraiNumero();




// FUNCTION

// creo una funzione che genera numeri random pescati da un array

function estraiNumero() {

    // creo un array con tutti i numeri da generare
    const numbersToExtract = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    ];

    // inizializzo l'array dei numeri estratti
    const numbersExtract = [];

    for (let i = 0; i < 5; i++) {

        // estraggo un numero con indice casuale
        const indiceCasuale = Math.floor(Math.random() * numbersToExtract.length);
        // elimino dall'array numeri da estrarre il numero estratto
        const number = numbersToExtract.splice(indiceCasuale, 1)[0];
        // metto il numero estratto in un altro array
        numbersExtract.push(number);

        console.log(number);
    }
    // pulisco la lista esistente
    numbersList.innerHTML = "";

    // creo un <li> per ogni numero estratto e lo aggiungo alla lista
    numbersExtract.forEach((number) => {
        const li = document.createElement("li");
        li.textContent = number;
        numbersList.appendChild(li);
    });


    return numbersExtract;
}


// creo una funzione asincrona che imposta un timer di 30 secondi

function creoCountdown() {

    // se sono alla fine
    if (seconds === 0) {
        // fermo l'esecuzione
        clearInterval(countDown);
        
        // le istruzioni cambiano
        instructions.innerText = "Inserisci tutti i numeri che ricordi (l'ordine non è importante)";

        // seleziono tutti i <li>
        const listItems = numbersList.querySelectorAll("li");

        // i numeri scompaiono dalla pagina
        listItems.forEach((item) => {
            item.style.display = "none";
        });

        // allo scadere faccio visualizzare in pagina 5 campi di input
        answersForm.className = "d";
    } else {
        // decremento i secondi
        seconds = seconds -1;
        countDown.innerText = seconds;
    }


}


// creo una funzione al click del pulsante
button.addEventListener("click", function (event) {
    event.preventDefault();

    //  inizializzo un array per i numeri in input
    const numbersInput = [];

    // la funzione confronta i numeri inseriti con quelli visualizzati all'inizio
    for (let i = 0; i < numbersForm.length; i++) {

        // prendo il valore dell'input
        const numbers = parseInt(numbersForm[i].value);

        // metto il valore nell'array
        numbersInput.push(numbers);

    }

    // inizializzo l'array numeri indovinati
    const numeriIndovinati = [];

    // confronto i numeri inseriti con quelli estratti
    numbersInput.forEach(inputNumber => {
        if (numbersRandom.includes(inputNumber)) {
            console.log(`Hai indovinato (${inputNumber})`);
            numeriIndovinati.push(inputNumber);
        }
    });


    // restituisce quanti numeri sono stati individuati
    if (numeriIndovinati.length > 0) {
        // Mostra tutti i numeri indovinati
        message.innerHTML = `Hai indovinato i numeri: (${numeriIndovinati.join(", ")})`;
    } else {
        // se non ci sono numeri indovinati
        message.innerHTML = "Non hai indovinato nessun numero.";
    }

    console.log("Numeri inseriti:", numbersInput);
    console.log("Numeri estratti:", numbersRandom);

})







