const contenedor = document.getElementById("contenedor");

//Creacion de fecha limite (en mi caso +1), es decir un dia mas
let fechaLimite = new Date();
fechaLimite.setDate(fechaLimite.getDate() + 1);

//Creacion del h1, titulo
const h1 = document.createElement("h1");
h1.textContent = "Fecha Límite: ";
const fechaLimiteSpan = document.createElement("span");
fechaLimiteSpan.textContent = fechaLimite.toLocaleString();
h1.appendChild(fechaLimiteSpan);
contenedor.appendChild(h1);

//Creacion de la tabla
const tabla = document.createElement("table");
tabla.className = "contador-tabla";
contenedor.appendChild(tabla);

//Subtitulos de las columnas del contador
const subtitulos = ["Mes", "Día", "Hora", "Minuto", "Segundo"];

//Filas de los subtitulos
const filaSubtitulos = document.createElement("tr");
tabla.appendChild(filaSubtitulos);

//Añado las filas a los subtitulos
for (let i = 0; i < subtitulos.length; i++) {
  const th = document.createElement("th");
  th.textContent = subtitulos[i];
  filaSubtitulos.appendChild(th);
}

//Creacion de la fila del contador
const filaContador = document.createElement("tr");
tabla.appendChild(filaContador);

//Objeto para almacenar las referencias a las celdas
let elementosContador = {};

//Creacion de celdas
for (let i = 0; i < subtitulos.length; i++) {
  const td = document.createElement("td");
  td.textContent = "0";
  filaContador.appendChild(td);
  elementosContador[subtitulos[i].toLowerCase()] = td;
}

//Funcion para cambiar el color según el tiempo que quede
function cambiarColorContador(distanciaEnDias) {
  let color;
  if (distanciaEnDias > 30) {
    color = "green";
  } else if (distanciaEnDias > 14) {
    color = "orange";
  } else {
    color = "red";
  }

  for (let key in elementosContador) {
    elementosContador[key].style.color = color;
  }
}

//Función principal para actualizar el contador
function actualizarContador() {
  const ahora = new Date();
  const distanciaEnSegundos = Math.max(0,(fechaLimite.getTime() - ahora.getTime()) / 1000);

  if (distanciaEnSegundos <= 0) {
    clearInterval(intervalo);
    h1.textContent = "¡Se acabó el tiempo!";
    for (let cambioColor in elementosContador) {
      elementosContador[cambioColor].textContent = "0";
      elementosContador[cambioColor].style.color = "red";
    }
    return;
  }

  let segundo = Math.floor(distanciaEnSegundos % 60);
  let minuto = Math.floor((distanciaEnSegundos / 60) % 60);
  let hora = Math.floor((distanciaEnSegundos / 3600) % 24);
  let dia = Math.floor((distanciaEnSegundos / (3600 * 24)) % 30);
  let mes = Math.floor(distanciaEnSegundos / (3600 * 24 * 30));

  elementosContador.mes.textContent = mes;
  elementosContador.día.textContent = dia;
  elementosContador.hora.textContent = hora;
  elementosContador.minuto.textContent = minuto;
  elementosContador.segundo.textContent = segundo;

  //Para cambiar el color del contador
  const distanciaEnDias = distanciaEnSegundos / (3600 * 24);
  cambiarColorContador(distanciaEnDias);
}

//Creación del contenedor para el input y el botón
const inputContainer = document.createElement("div");
inputContainer.className = "input-container";
document.body.appendChild(inputContainer);

//Creación de nueva fecha por input
const textBox = document.createElement("input");
textBox.type = "text";
textBox.placeholder = "Introduce nueva fecha";
inputContainer.appendChild(textBox);

//Creación del botón
const boton = document.createElement("button");
boton.textContent = "Establecer Fecha Límite";
inputContainer.appendChild(boton);

//Evento click
boton.addEventListener("click", function () {
  const inputValue = textBox.value;
  const parsedDate = Date.parse(inputValue);

  if (!isNaN(parsedDate)) {
    fechaLimite = new Date(parsedDate);
    fechaLimiteSpan.textContent = fechaLimite.toLocaleString();
    actualizarContador();
  } else {
    alert("Por favor, introduce una fecha válida.");
  }
});

//Inicia el contador
actualizarContador();
const intervalo = setInterval(actualizarContador, 1000);
