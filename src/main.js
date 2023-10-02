import { startGame } from './Juego.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('botonInicio');
    startButton.addEventListener('click', startGame);
});