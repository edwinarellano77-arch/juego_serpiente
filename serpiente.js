const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const tamanoCelda = 25;
let puntaje = 0;
let direccionActual = "derecha";
let juegoFinalizado = false;
let ComidaX = 0
let ComidaY = 0
let velocidad = 300;
let intervaloSerpiente;
const lineaX = 5;
const lineaY = 1;
let serpiente = [
  { x: 7, y: 6 },
  { x: 6, y: 6 },
  { x: 5, y: 6 },
  { x: 4, y: 6 },
  { x: 3, y: 6 },
  { x: 2, y: 6 }
];

function dibujarTablero() {
  for (let i = 0; i < canvas.width; i += tamanoCelda) {
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += tamanoCelda) {
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
};

function pintarParte(lineaX, lineaY, color) {
  let valorx = lineaX * tamanoCelda;
  let valory = lineaY * tamanoCelda;
  ctx.fillStyle = color;
  ctx.fillRect(valorx, valory, tamanoCelda, tamanoCelda);

  ctx.strokeStyle = color;
  ctx.strokeRect(valorx, valory, tamanoCelda, tamanoCelda)
}

function pintarSerpiente() {
  let movimiento;
  for (let i = 0; i < serpiente.length; i++) {
    movimiento = serpiente[i]
    if (i == 0) {
      pintarParte(movimiento.x, movimiento.y, "brown")
    } else {
      valorx = movimiento.x
      valory = movimiento.y
      let pintarSerpientes = pintarParte(valorx, valory, "red")
    }
  }
}

function moverDerecha() {
  let cabezaActual = serpiente[0]
  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierdo() {
  let cabezaActual = serpiente[0]
  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabezaActual = serpiente[0]
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y - 1
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0]
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function cambiarDireccion(direccion) {
  if (direccionActual === "derecha" && direccion === "izquierda") {
    return;
  }
  if (direccionActual === "izquierda" && direccion === "derecha") {
    return;
  }
  if (direccionActual === "arriba" && direccion === "abajo") {
    return;
  }
  if (direccionActual === "abajo" && direccion === "arriba") {
    return;
  }

  direccionActual = direccion;
}

function iniciarJuego() {
  if (juegoFinalizado == true) {
    return;
  }

  intervaloSerpiente = setInterval(moverSerpiente, velocidad)
}

function pausarJuego() {
  clearInterval(intervaloSerpiente)
}

function moverSerpiente() {
  if (direccionActual == "derecha") {
    moverDerecha()
  } else if (direccionActual == "izquierda") {
    moverIzquierdo()
  } else if (direccionActual == "arriba") {
    moverArriba()
  } else if (direccionActual == "abajo") {
    moverAbajo()
  }

  let colisionComida = atraparComida()

  if (colisionComida) {
    puntaje = puntaje + 1
    let puntos = document.getElementById("puntaje")
    puntos.innerHTML = puntaje;

    let colaActual = serpiente[serpiente.length - 1]
    let colaNueva
    if (direccionActual == "derecha") {
      colaNueva = {
        x: colaActual.x - 1,
        y: colaActual.y
      }
    }
    if (direccionActual == "izquierda") {
      colaNueva = {
        x: colaActual.x + 1,
        y: colaActual.y
      }
    }
    if (direccionActual == "arriba") {
      colaNueva = {
        x: colaActual.x,
        y: colaActual.y + 1
      }
    }
    if (direccionActual == "abajo") {
      colaNueva = {
        x: colaActual.x,
        y: colaActual.y - 1
      }
    }
    serpiente.push(colaNueva);
    generarComida();
  }
  verificarCondicionBordes();
  verificarColisionCuerpo();
  dibujarTodo();
}

function verificarCondicionBordes() {
  let cabeza = serpiente[0];
  if (cabeza.x < 0 || cabeza.x >= canvas.width / tamanoCelda) {
    pausarJuego()
    document.getElementById("estado").innerHTML = "GAME OVER"
    juegoFinalizado = true
    desabilitarBotones()
  } else if (cabeza.y < 0 || cabeza.y >= canvas.height / tamanoCelda) {
    pausarJuego()
    document.getElementById("estado").innerHTML = "GAME OVER"
    juegoFinalizado = true
    desabilitarBotones()
  }
}

function generarComida() {
  let lineasY = canvas.height / tamanoCelda
  let lineasX = canvas.width / tamanoCelda
  ComidaX = Math.floor(Math.random() * lineasX)
  ComidaY = Math.floor(Math.random() * lineasY)
}

function pintarComida() {
  pintarParte(ComidaX, ComidaY, "yellow")
}

function atraparComida() {
  let cabeza = serpiente[0]
  if (cabeza.x === ComidaX && cabeza.y === ComidaY) {
    return true
  } else {
    return false
  }
}

function verificarColisionCuerpo() {
  let cabeza = serpiente[0]

  for (let i = 1; i < serpiente.length; i++) {
    let parte = serpiente[i]

    if (cabeza.x === parte.x && cabeza.y === parte.y) {
      pausarJuego()
      document.getElementById("estado").innerHTML = "GAME OVER"
      juegoFinalizado = true
      desabilitarBotones()
    }
  }
}

function reiniciarJuego() {
  puntaje = 0
  document.getElementById("puntaje").innerHTML = puntaje;
  direccionActual = "derecha";
  serpiente = [
    { x: 4, y: 8 },
    { x: 3, y: 8 },
    { x: 2, y: 8 },
    { x: 1, y: 8 }
  ];
  juegoFinalizado = false
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  habilitarBotones();
  dibujarTodo();
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function desabilitarBotones() {
  let arriba = document.getElementById("arriba");
  arriba.disabled = true;
  let abajo = document.getElementById("abajo");
  abajo.disabled = true;
  let derecha = document.getElementById("derecha");
  derecha.disabled = true;
  let izquierda = document.getElementById("izquierda");
  izquierda.disabled = true;
  let iniciar = document.getElementById("iniciar");
  iniciar.disabled = true;
  let pausar = document.getElementById("pausar");
  pausar.disabled = true;
}

function habilitarBotones() {
  let arriba = document.getElementById("arriba");
  arriba.disabled = false;
  let abajo = document.getElementById("abajo");
  abajo.disabled = false;
  let derecha = document.getElementById("derecha");
  derecha.disabled = false;
  let izquierda = document.getElementById("izquierda");
  izquierda.disabled = false;
  let iniciar = document.getElementById("iniciar");
  iniciar.disabled = false;
  let pausar = document.getElementById("pausar");
  pausar.disabled = false;
}

function dibujarTodo() {
  limpiarCanvas()
  dibujarTablero()
  pintarSerpiente()
  pintarComida()
}

generarComida()
dibujarTodo();

