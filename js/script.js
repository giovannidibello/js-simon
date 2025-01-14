// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

// seleziono gli elementi del dom dalla pagina
const countDown = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const answersForm = document.getElementById("answers-form");
const numbersForm = document.querySelectorAll("form-control");
const button = document.querySelector("button");
const message = document.getElementById("message");

// creo una funzione che genera numeri random pescati da un array

    // faccio visualizzare i numeri generati in pagina

// creo una funzione asincrona che imposta un timer di 30 secondi

    // i numeri scompaiono dalla pagina

    // allo scadere faccio visualizzare in pagina 5 campi di input

// creo una funzione al click del pulsante

    // la funzione confronta i numeri inseriti con quelli visualizzati all'inizio

    // restituisce se e quanti numeri sono stati individuati

