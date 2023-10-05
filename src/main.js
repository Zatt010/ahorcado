import { startGame} from './Juego.js';
import { startGameVocales} from './VocalesJuego.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('botonInicio');
    const modoSelect = document.getElementById('ModoSelect');

    const gameModes = {
        'clasico': startGame,
        'vocales': startGameVocales,
    };

    startButton.addEventListener('click', () => {
        const selectedMode = modoSelect.value;

        // Verifica si el modo seleccionado está en el objeto de modos de juego
        if (selectedMode in gameModes) {
            gameModes[selectedMode](); // Llama a la función correspondiente
        } else {
            console.error('Modo de juego no válido');
        }
    });
});
