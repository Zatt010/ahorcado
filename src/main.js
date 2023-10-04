import { startGame } from './Juego.js';

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('ModoSelect');
    const startButton = document.getElementById('botonInicio');
    startButton.addEventListener('click', startGame);
});