// 1. Capturamos el canvas y su contexto de dibujo

const canvas = document.getElementById("canvasJuego");

const ctx = canvas.getContext("2d");


const TAMANIO_CELDA=25;
dibujarTablero=function(){
ctx.strokeStyle="white";
ctx.beginPath();//Empeiza a dibujar en el canva
ctx.moveTo(0,0); //Donde empieza a dubujar
ctx.lineTo(100,100);//Hasta donde dibujar
ctx.stroke();//Pinta contorno
}

dibujarTablero2=function(){
for(let i=0;i<canvas.width;i+=TAMANIO_CELDA){
ctx.strokeStyle="white";
ctx.beginPath();//Empeiza a dibujar en el canva
ctx.moveTo(i,0); //Donde empieza a dubujar
 ctx.lineTo(i,canvas.height);//Hasta donde dibujar
 ctx.stroke();
}

for(let i=0;i<canvas.height;i+=TAMANIO_CELDA){
ctx.strokeStyle="white";
ctx.beginPath();//Empeiza a dibujar en el canva
ctx.moveTo(0,i); //Donde empieza a dubujar
ctx.lineTo(canvas.width,i);//Hasta donde dibujar
ctx.stroke();
}

}

 // Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
limpiarCanvas();
dibujarTablero2();}

function dibujarTodo() {

limpiarCanvas();
dibujarTablero2();
pintarParte(5, 5);
pintarParte(10, 2);
pintarParte((canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA,
(canvas.width - TAMANIO_CELDA) / TAMANIO_CELDA,);
pintarParte((canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA, 10);
pintarParte(0, (canvas.width - TAMANIO_CELDA) / TAMANIO_CELDA);
pintarParte((canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA, 0);
}


function pintarParte(lineaX, lineaY) {

let valorX = lineaX * TAMANIO_CELDA;
let valorY = lineaY * TAMANIO_CELDA;
ctx.fillStyle = "yellow";
ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
ctx.strokeStyle = "black";
ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
}

