import { inicializarCanvas, dibujarParteCuerpo, dibujarAhorcado } from './Dibujar.js';
import { partesCuerpo } from './Dibujar.js';
import { futbol, basket, comida, animales, paises, pokemon } from './Categorias.js';

const wordContainer = document.getElementById('contenedorPalabra');
const usedLettersElement = document.getElementById('letrasUsadas');
const palabraInput = document.getElementById('palabraInput'); // Nuevo elemento de entrada
const adivinarPalabraButton = document.getElementById('adivinarPalabra'); // Nuevo botón
const startButton = document.getElementById('botonInicio');
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

let selectedWord;
let usedLetters;
let mistakes;
let hits;

export const startGamePalabras = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    document.querySelector('#mensaje-oculto').innerHTML = '';
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'none';

    // Mostrar el contenedor de palabras completas
    const contenedorPalabrasCompletas = document.getElementById('contenedorPalabrascompletas');
    contenedorPalabrasCompletas.style.display = 'block';

    startButton.style.display = 'none';
    inicializarCanvas();
    selectRandomWord();
    dibujarPalabra();
    dibujarAhorcado(ctx);

    // Agregar evento para el botón de adivinar
    adivinarPalabraButton.addEventListener('click', adivinarPalabra);
};


export const addLetter = (letter) => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
};

export const addBodyPart = (bodyPart) => {
    dibujarParteCuerpo(ctx, bodyPart);
};

export const wrongLetter = () => {
    addBodyPart(partesCuerpo[mistakes]);
    mistakes++;
    if (mistakes === partesCuerpo.length) endGame(false); // El jugador pierde
};

export const endGame = (hasWon) => {
    document.removeEventListener('keydown', letterEvent);
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('hidden');
    }
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'block';
    const gameContainer = document.getElementById('contenedorModoJuego');
    gameContainer.style.display = 'block';
    startButton.style.display = 'block';
    const Container = document.getElementById('contenedorPalabrascompletas');
    Container.style.display = 'none';
    
    // Mostrar el mensaje de victoria o derrota según corresponda
    if (hasWon) {
        document.querySelector('#mensaje-oculto').innerHTML = "<p> Ganaste! </p>";
    } else {
        document.querySelector('#mensaje-oculto').innerHTML = "<p> Perdiste! </p>";
    }

    // Restablecer el valor del campo de entrada
    palabraInput.value = '';
};


export const correctLetter = (letter) => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame(true); // El jugador gana
};

export const letterInput = (letter) => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const adivinarPalabra = () => {
    const palabraIngresada = palabraInput.value.trim().toUpperCase();

    if (palabraIngresada === selectedWord.join('')) {
        // El jugador adivinó la palabra completa
        endGame(true); // Has ganado
    } else {
        // La palabra ingresada no coincide con la palabra al azar
        wrongWord();
    }
};

const wrongWord = () => {
    if (mistakes < partesCuerpo.length) {
        wrongLetter();
    } else {
        endGame(false); // El jugador pierde si ya ha adivinado mal todas las partes del cuerpo
    }
};


const letterEvent = (event) => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

export const dibujarPalabra = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

export const selectRandomWord = () => {
    const categorySelect = document.getElementById('categoriaSelect');
    const selectedCategory = categorySelect.value;

    const categoryMap = { //categorias
        'futbol': futbol,
        'basket': basket,
        'comida': comida,
        'animales': animales,
        'paises': paises,
        'pokemon': pokemon
    };
    const selectedList = categoryMap[selectedCategory];

    if (selectedList) {
        const randomIndex = Math.floor(Math.random() * selectedList.length);
        const selectedEntry = selectedList[randomIndex];
        selectedWord = selectedEntry.palabra.toUpperCase().split('');
        // Muestra la pista en el elemento de texto
        const pistaTexto = document.getElementById('pistaTexto');
        pistaTexto.textContent = `Pista: ${selectedEntry.pista}`;
        // Muestra la pista en la consola
        console.log('Pista:', selectedEntry.pista);
    } else {
        // Manejar cualquier otro valor seleccionado o mostrar un mensaje de error.
    }
};

// Agrega eventos aquí para el botón de inicio y otros elementos según tus necesidades
