export const inicializarCanvas = () => {
    const canvas = document.getElementById('lienzo'); // Obtener el elemento canvas del HTML
    const ctx = canvas.getContext('2d'); // Obtener el contexto 2D del canvas
    ctx.canvas.width = 0; // Establecer el ancho del canvas a 0
    ctx.canvas.height = 0; // Establecer la altura del canvas a 0
};

export const partesCuerpo = [ // Definir las partes del cuerpo del ahorcado como coordenadas [x, y, ancho, alto]
    [4, 2, 1, 1],     // Cabeza (modificado para que sea redonda)
    [4.25, 3, 0.5, 2], // Torso
    [3.3, 4.7, 1, 0.3],    // Pie izquierdo
    [4.7, 4.7, 1, 0.3],    // Pie derecho
    [3.3, 3, 1, 0.3],  // Mano izquierda
    [4.7, 3, 1, 0.3]   // Mano derecha
];

export const dibujarParteCuerpo = (ctx, parteCuerpo) => { // Función para dibujar una parte del cuerpo
    ctx.fillStyle = '#000'; // Establecer el color de relleno en negro

    if (parteCuerpo === partesCuerpo[0]) { // Si es la cabeza
        const [x, y, ancho, alto] = parteCuerpo;
        const radio = ancho / 2; // Calcular el radio para hacerlo redondo
        const centroX = x + radio;
        const centroY = y + radio;
        ctx.beginPath();
        ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillRect(...parteCuerpo); // Dibujar las otras partes del cuerpo de forma rectangular
    }
};



export const dibujarAhorcado = (ctx) => { // Función para dibujar el ahorcado
    ctx.canvas.width = 120; // Establecer el ancho del canvas
    ctx.canvas.height = 160; // Establecer la altura del canvas
    ctx.scale(20, 20); // Escalar el contexto para el dibujo
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpiar el canvas
    ctx.fillStyle = '#69483b'; // Establecer el color de relleno para el ahorcado
    ctx.fillRect(0, 7, 4, 1); // Dibujar la viga horizontal
    ctx.fillRect(1, 0, 1, 8); // Dibujar la viga vertical
    ctx.fillRect(2, 0, 3, 1); // Dibujar la viga superior
    ctx.fillRect(4, 1, 1, 1); // Dibujar la cabeza
};

