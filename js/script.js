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
estraiNumeri();


// salvo l'array ritornato dalla funzione estraiNumero
const numbersRandom = estraiNumeri();


// FUNCTION

// creo una funzione che genera i numeri random

function estraiNumeri() {

    // inizializzo l'array dei numeri estratti
    const numbersExtract = [];

    for (let i = 0; i < 5; i++) {

        // genero un numero random
        let number = Math.floor(Math.random() * 50) + 1;

        if (numbersExtract.includes(number)) {

            // elimino il numero già presente
            i--;

        } else {
            // metto il numero estratto in un altro array
            numbersExtract.push(number);
        }

    }
    
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
        seconds = seconds - 1;
        countDown.innerText = seconds;
    }


}


// creo una funzione al click del pulsante
button.addEventListener("click", function (event) {
    event.preventDefault();

    // disabilito il bottone
    button.disabled = true;

    //  inizializzo un array per i numeri in input
    const numbersInput = [];

    // ciclo i numeri in input
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
    if (numeriIndovinati.length === 1) {

        // mostra il numero indovinato
        message.innerHTML = `Hai indovinato il numero: (${numeriIndovinati})`;

    } else if (numeriIndovinati.length > 1 && numeriIndovinati.length < 5) {

        // mostra i numeri indovinati
        message.innerHTML = `Hai indovinato ${numeriIndovinati.length} numeri: (${numeriIndovinati.join(", ")})`;

    } else if (numeriIndovinati.length === numbersInput.length) {

        // tutti i numeri sono stati indovinati
        message.innerHTML = `Congratulazioni hai indovinato tutti i numeri: (${numeriIndovinati.join(", ")})`;

        // cambio colore al testo
        message.classList.remove("text-danger");
        message.classList.add("text-success");

    } else {

        // se non ci sono numeri indovinati
        message.innerHTML = "Non hai indovinato nessun numero.";

    }

    console.log("Numeri inseriti:", numbersInput);
    console.log("Numeri estratti:", numbersRandom);

})

// aggiungo un evento input alla digitazione 
numbersForm.forEach((inputField, index) => {
    inputField.addEventListener("input", function () {

        // prendo il valore dell'input corrente
        const value = parseInt(inputField.value);

        if (isNaN(value)) {

            // messaggio di errore
            message.innerText = "Inserisci un valore valido";

            // disabilito il bottone
            button.disabled = true;

        } else {
            message.innerText = "";

            // variabile flag
            let duplicateFound = false;

            // ciclo per confrontare se ci sono numeri inseriti uguali
            for (let i = 0; i < numbersForm.length; i++) {

                // non confronto con se stesso
                if (i !== index) {

                    // assegno il valore iesimo
                    const otherValue = parseInt(numbersForm[i].value);

                    // se il valore è uguale ad un altro
                    if (value === otherValue) {
                        duplicateFound = true;
                    }
                }
            }

            // se c'è un duplicato restituisce il messaggio
            if (duplicateFound) {
                message.innerText = "I valori inseriti non devono essere uguali";
                // disabilito il bottone
                button.disabled = true;
            } else {
                // abilito il bottone
                button.disabled = false;
            }
        }
    });
});








