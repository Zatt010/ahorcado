import { startGame} from './Juego.js';                  //  Importa Modo de juego Clasico
import { startGameVocales} from './VocalesJuego.js'; 
   //Importa Modo de juego Vocales
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('botonInicio');  // Obtiene referencia del Botón Inicio
    const modoSelect = document.getElementById('ModoSelect');    // Obtiene referencia del modo de juego
    const modoJuegoContainer = document.getElementById('contenedorModoJuego'); // Contenedor de modo de juego
    
    const gameModes = {
        'clasico': startGame,
        'vocales': startGameVocales,
    };

    startButton.addEventListener('click', () => {
        const selectedMode = modoSelect.value; // Obtiene el valor del modo de juego seleccionado

        // Verifica si el modo seleccionado está en el objeto de modos de juego
        if (selectedMode in gameModes) {
            gameModes[selectedMode](); // Llama a la función correspondiente

            // Oculta el contenedor de selección de modo de juego
            modoJuegoContainer.style.display = 'none';
        } else {
            console.error('Modo de juego no válido');
        }
    });
});
