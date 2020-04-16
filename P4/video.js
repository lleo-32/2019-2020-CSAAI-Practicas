console.log("Ejecutando JS...");

//----- Obtener elemento de video y configurarlo
const video = document.getElementById("video")
video.width=500;  //-- Tamaño de la pantalla de video
video.height=500;

//----- Obtener elemento de video y configurarlo
const video1 = document.getElementById("video1")
video1.width=130;  //-- Tamaño de la pantalla de video
video1.height=130;
video1.src="https://github.com/lleo-32/Videos-practica4/raw/master/video1.mp4";

const video2 = document.getElementById("video2")
video2.width=130;  //-- Tamaño de la pantalla de video
video2.height=130;
video2.src="https://github.com/lleo-32/Videos-practica4/raw/master/video-2.mp4";

const video3 = document.getElementById("video3")
video3.width=130;  //-- Tamaño de la pantalla de video
video3.height=130;
video3.src="https://github.com/lleo-32/Videos-practica4/raw/master/video3.mp4";

const imagen = document.getElementById("imagen")
imagen.width = 130;
imagen.height = 115;



//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
video.poster="portada.jpg";


//-- Obtener los botones
const play = document.getElementById("play")
const stop = document.getElementById("stop")

//-- Función de retrollamada del botón de ver
fuente1.onclick = () => {
  console.log("Click!");
  video.src=video1.src;
  video.currentTime = video1.currentTime;
  video1.style.border = "4px solid red"
 video2.style.border = "0"
 video3.style.border = "0"
 imagen.style.border = "0"
  video.play();
};

fuente2.onclick = () => {
  console.log("Click!");
  video.src=video2.src;
  video.currentTime = video2.currentTime;
  video1.style.border = "0";
  video2.style.border = "4px solid red";
  video3.style.border = "0";
  imagen.style.border = "0";
  video.play();
};

fuente3.onclick = () => {
  console.log("Click!");
  video.src=video3.src;
  video.currentTime = video3.currentTime;
  video1.style.border = "0";
  video2.style.border = "0";
  video3.style.border = "4px solid red";
  imagen.style.border = "0";
  video.play();
};

fuente4.onclick = () => {
  console.log("Click!");
  video.src = null;
  video.poster = imagen.src;
  video1.style.border = "0";
  video2.style.border = "0";
  video3.style.border = "0";
  imagen.style.border = "4px solid red";

};

//-- Funcion de retrollamada del boton de parar
stop.onclick = () => {
  video1.pause();
  video2.pause();
  video3.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  video1.src=null;
  video2.src=null;
  video3.src=null;
}
