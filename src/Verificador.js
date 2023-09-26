const letraInput = document.getElementById("letra");
const adivinarForm = document.getElementById("adivinar-form");
const resultadoDiv = document.querySelector("#resultado-div");

// Escuchar el evento de envío del formulario
adivinarForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const letraAdivinada = letraInput.value.toLowerCase(); // Convertir la letra a minúsculas

  // Obtener la categoría seleccionada
  const categoriaSelect = document.getElementById("categoria");
  const categoria = categoriaSelect.value.toLowerCase();

  // Obtener el contenido del archivo correspondiente a la categoría
  fetch(`/src/Musica.txt`) // Asegúrate de que la ruta sea correcta
    .then((response) => response.text())
    .then((data) => {
      // Mostrar el contenido completo del archivo en resultadoDiv
      resultadoDiv.innerHTML = data;
    })
    .catch((error) => {
      resultadoDiv.innerHTML = "Error al cargar el archivo.";
      console.error(error);
    });

  letraInput.value = "";
});
