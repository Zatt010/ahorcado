import { startGame} from './Juego.js';                  //  Importa Modo de juego Clasico
import { startGameVocales} from './VocalesJuego.js';
import { startGameConsonantes} from './Consonantes.js';
import { startGamePalabras} from './frases.js';
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contenedorPalabrascompletas').style.display = 'none'; // Oculta el contenedor desde el principio

    const startButton = document.getElementById('botonInicio');
    const modoSelect = document.getElementById('ModoSelect');
    const modoJuegoContainer = document.getElementById('contenedorModoJuego');

    const gameModes = {
        'clasico': startGame,
        'vocales': startGameVocales,
        'consonantes': startGameConsonantes,
        'frases': startGamePalabras,
    };

    startButton.addEventListener('click', () => {
        const selectedMode = modoSelect.value;

        if (selectedMode in gameModes) {
            gameModes[selectedMode]();
            modoJuegoContainer.style.display = 'none';
        } else {
            console.error('Modo de juego no válido');
        }
    });
});