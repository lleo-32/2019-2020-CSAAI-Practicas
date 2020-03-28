console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("Bing_1.mp3");
const sonido_rebote = new Audio("rebote.mp3");
const sonido_perder = new Audio("perder.mp3");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  //estado saque izquierda
  SAQUE: 1,
  JUGANDO: 2,
  //estado saque derecha
  DER: 3,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;
var puntos_derecha = 0;
var puntos_izquierda = 0;

//-- Pintar todos los objetos en el canvas
function draw() {
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO) {
    bola.draw();
  }

  //-- Dibujar las raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

}

function drawscore(){


  //------ Dibujar el tanteo
  if (bola.x >= canvas.width) {
    puntos_derecha = puntos_derecha + 1;
}

if (bola.x <= bola.size){
    puntos_izquierda = puntos_izquierda + 1;
}

ctx.font = "100px Arial";
ctx.fillStyle = "white";
ctx.fillText(puntos_izquierda, 200, 80);
ctx.fillText(puntos_derecha, 340, 80);


  //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUE) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Saca!", 30, 350);
  }


  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Pulsa Start!", 30, 350);
  }
}

//---- Bucle principal de la animación
function animacion()
{

  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();


  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {

    estado = ESTADO.DER;
    bola.init();
    console.log("Tanto!!!!");
    //-- Reproducir sonido
    sonido_perder.currentTime = 0;
    sonido_perder.play();
    return;

  }

  //-- Si llega al límite izquierdo, hemos perdido
  //-- pasamos al estado de SAQUE
  if (bola.x <= bola.size) {

     estado = ESTADO.SAQUE;
     bola.init();
     console.log("Tanto!!!!");
     //-- Reproducir sonido
     sonido_perder.currentTime = 0;
     sonido_perder.play();
     return;
  }

  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {

    bola.vx = bola.vx * -1;

    //-- Reproducir sonido
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  }

  if (bola.y >= canvas.height){
      bola.vy = bola.vy * -1;
    } else if (bola.y <= 0){
      bola.vy = bola.vy * -1;
    }

  //-- Comprobar si hay colisión con la raqueta derecha
  if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
      bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
    bola.vx = bola.vx * -1;
    //-- Reproducir sonido
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();
  drawscore();

//  window.requestAnimationFrame(animacion);
}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();

//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Retrollamada de las teclas
window.onkeydown = (e) => {

  //-- En el estado inicial no se
  //-- hace caso de las teclas
  if (estado == ESTADO.INIT)
    return;

  switch (e.key) {
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "p":
      raqD.v = raqD.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    case "s":

      //-- El saque solo funciona en el estado de SAQUE
      if (estado == ESTADO.SAQUE) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial izquierda
        bola.init();

        //-- Darle velocidad
        bola.vx = bola.vx_ini;
        bola.vy = bola.vy_ini;

        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }

      if (estado == ESTADO.DER) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion derecha
        bola.init2();

        //-- Darle velocidad
        bola.vx = bola.vx_ini_d;
        bola.vy = bola.vy_ini_d;

        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }

  if (e.key == "p" || e.key == "l") {
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  bola.init();
  start.disabled = false;
}
