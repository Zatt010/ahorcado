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

export const iniciarJuegoVocales = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    document.querySelector('#mensaje-oculto').innerHTML = '';
    // Ocultar el div de categoría
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'none';

    startButton.style.display = 'none';
    inicializarCanvas();
    seleccionarPalabraAleatoriaVocales();
    dibujarPalabra();
    dibujarAhorcado(ctx);
    document.addEventListener('keydown', eventoLetra);
};

export const agregarLetra = (letra) => {
    const letraElement = document.createElement('span');
    letraElement.innerHTML = letra.toUpperCase();
    usedLettersElement.appendChild(letraElement);
};

export const agregarParteCuerpo = (parteCuerpo) => {
    dibujarParteCuerpo(ctx, parteCuerpo);
};

export const letraIncorrecta = () => {
    agregarParteCuerpo(partesCuerpo[mistakes]);
    mistakes++;
    if (mistakes === partesCuerpo.length) finJuego(false); // El jugador pierde
};

export const finJuego = (haGanado) => {
    document.removeEventListener('keydown', eventoLetra);
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('hidden');
    }
    const categoryContainer = document.getElementById('contenedorCategoria');
    categoryContainer.style.display = 'block';

    startButton.style.display = 'block';

    // Mostrar el mensaje de victoria o derrota según corresponda
    if (haGanado) {
        document.querySelector('#mensaje-oculto').innerHTML = "<p> ¡Ganaste! </p>";
    } else {
        document.querySelector('#mensaje-oculto').innerHTML = "<p> ¡Perdiste! </p>";
    }
};

export const letraCorrecta = (letra) => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letra) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) finJuego(true); // El jugador gana
};

export const eventoLetra = (evento) => {
    let nuevaLetra = evento.key.toUpperCase();
    if (nuevaLetra.match(/^[a-zñ]$/i) && !usedLetters.includes(nuevaLetra)) {
        letraInput(nuevaLetra);
    }
};

export const dibujarPalabra = () => {
    selectedWord.forEach(letra => {
        const letraElement = document.createElement('span');
        letraElement.innerHTML = letra.toUpperCase();
        letraElement.classList.add('letter');
        letraElement.classList.add('hidden');
        wordContainer.appendChild(letraElement);
    });
};

export const seleccionarPalabraAleatoriaVocales = () => {
    const categoriaSeleccionada = document.getElementById('categoriaSelect').value;

    const mapaCategorias = {
        'futbol': futbol,
        'basket': basket,
        'comida': comida,
        'animales': animales,
        'paises': paises,
        'pokemon': pokemon
    };

    const listaSeleccionada = mapaCategorias[categoriaSeleccionada];

    if (listaSeleccionada) {
        // Filtrar las vocales de la palabra seleccionada
        const palabra = listaSeleccionada[Math.floor(Math.random() * listaSeleccionada.length)].toUpperCase();
        selectedWord = palabra.split('').filter(letra => 'AEIOU'.includes(letra));
    } else {
        // Manejar cualquier otro valor seleccionado o mostrar un mensaje de error.
    }
};
