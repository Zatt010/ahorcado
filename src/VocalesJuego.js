import { inicializarCanvas, dibujarParteCuerpo, dibujarAhorcado } from './Dibujar.js';
import { partesCuerpo } from './Dibujar.js';
import { futbol, basket, comida, animales, paises, pokemon } from './Categorias.js';
const wordContainer = document.getElementById('contenedorPalabra');
const usedLettersElement = document.getElementById('letrasUsadas');
const startButton = document.getElementById('botonInicio');
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

let selectedWord;
let usedLetters;
let mistakes;
let hits;
let selectedWordWithPosition = [];

export const startGameVocales = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    document.querySelector('#mensaje-oculto').innerHTML= '';
    // Ocultar el div de categoría
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'none';

    startButton.style.display = 'none';
    inicializarCanvas();
    selectRandomWord();
    dibujarPalabra();
    dibujarVocales();
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

    startButton.style.display = 'block';

    // Mostrar el mensaje de victoria o derrota según corresponda
    if (hasWon) {
        document.querySelector('#mensaje-oculto').innerHTML = "<p> Ganaste! </p>";
    } else {
        document.querySelector('#mensaje-oculto').innerHTML = "<p> Perdiste! </p>";
    }
};

export const correctLetter = (letter, position) => {
    const { children } = wordContainer;
    if (children[position]) {
        children[position].innerHTML = letter.toUpperCase();
        children[position].classList.remove('hidden');
        hits++;
        if (hits === selectedWord.length) endGame(true); // El jugador gana
    }
};

export const letterInput = (letter) => {
    const positions = [];
    selectedWord.forEach((char, index) => {
        if (char === letter) {
            correctLetter(letter, index);
            positions.push(index);
        }
    });

    if (positions.length === 0) {
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
export const dibujarVocales = () => {
    selectedWord.forEach((letter, index) => {
        const letterElement = document.createElement('span');
        if (/[aeiouAEIOU]/.test(letter)) {
           // letterElement.innerHTML = '_';
            letterElement.classList.add('vowel');
            letterElement.addEventListener('click', () => {
                if (!usedLetters.includes(letter.toLowerCase())) {
                    letterInput(letter.toLowerCase());
                }
            });
        } else {
            letterElement.innerHTML = letter.toUpperCase();
        }
        letterElement.classList.add('letter');
        wordContainer.appendChild(letterElement);
    });
};

/*
export const dibujarVocales = () => {
    const vowels = ['a', 'e', 'i', 'o'];
    selectedWordWithPosition.forEach(({ letter, position }) => {
        if (vowels.includes(letter.toLowerCase())) {
            correctLetter(letter.toLowerCase(), position);
        }
    });
};*/

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
        const word = selectedList[Math.floor(Math.random() * selectedList.length)].toUpperCase();
        selectedWord = word.split('');
        selectedWordWithPosition = word.split('').map((letter, index) => ({ letter, position: index }));
    } else {
        // Manejar cualquier otro valor seleccionado o mostrar un mensaje de error.
    }
};
