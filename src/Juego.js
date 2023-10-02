import { inicializarCanvas, dibujarParteCuerpo, dibujarAhorcado } from './Dibujar.js';
import { partesCuerpo } from './Dibujar.js';
import { futbol, basket } from './Categorias.js';
const wordContainer = document.getElementById('contenedorPalabra');
const usedLettersElement = document.getElementById('letrasUsadas');
const startButton = document.getElementById('botonInicio');
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

let selectedWord;
let usedLetters;
let mistakes;
let hits;

export const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    
    // Ocultar el div de categoría
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'none';

    startButton.style.display = 'none';
    inicializarCanvas();
    selectRandomWord();
    dibujarPalabra();
    dibujarAhorcado(ctx);
    document.addEventListener('keydown', letterEvent);
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
    if (mistakes === partesCuerpo.length) endGame();
};


export const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('hidden');
    }
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'block';

    startButton.style.display = 'block';
};

export const correctLetter = (letter) => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame();
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

export const letterEvent = (event) => {
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

    const categoryMap = {
        'futbol': futbol,
        'basket': basket,
        // Agrega más categorías y sus listas de palabras aquí si es necesario
    };

    const selectedList = categoryMap[selectedCategory];

    if (selectedList) {
        const word = selectedList[Math.floor(Math.random() * selectedList.length)].toUpperCase();
        selectedWord = word.split('');
    } else {
        // Manejar cualquier otro valor seleccionado o mostrar un mensaje de error.
    }
};
