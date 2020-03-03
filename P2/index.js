console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")


let digitos = document.getElementsByClassName("cdigito")

for(i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev) =>{
    digito(ev.target);
  }
}

function digito(button) {
  if(display.innerHTML=="0"){
  display.innerHTML = button.value;
}else{
  display.innerHTML += button.value;
  }

}

//-- Insertar simbolo de sumar
suma.onclick = () => {
  display.innerHTML += suma.value;
}

resta.onclick = () => {
  display.innerHTML += resta.value;
}

div.onclick = () => {
  display.innerHTML += div.value;
}

multi.onclick = () => {
  display.innerHTML += multi.value;
}
//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

punto.onclick = () => {
  display.innerHTML += punto.value;
}


//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
