let puzzleContainer = document.getElementById("puzzle");
let mensaje = document.getElementById("mensaje");
let cronometroDisplay = document.getElementById("cronometro");
let dialogo = document.getElementById("dialogo");
let dialogoCuadro = document.getElementById("dialogoCuadro");
let dialogoTitulo = document.getElementById("dialogoTitulo");
let dialogoMensaje = document.getElementById("dialogoMensaje");

let piezas = [
    "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg",
    "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg",
    "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg",
    "img/13.jpg", "img/14.jpg", "img/15.jpg", ""
];

let estado = [];
let tiempo = 300;
let intervaloCronometro;
let juegoActivo = false;

function mezclar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function dibujar() {
    puzzleContainer.innerHTML = "";
    estado.forEach((valor, i) => {
        let celda = document.createElement("div");
        celda.classList.add("celda");

        if (valor === "") {
            celda.classList.add("vacio");
        } else {
            let imagen = document.createElement("img");
            imagen.src = valor;
            imagen.alt = `Pieza ${i + 1}`;
            celda.appendChild(imagen);
            celda.addEventListener("click", () => mover(i));
        }
        puzzleContainer.appendChild(celda);
    });
}

function mover(indice) {
    if (!juegoActivo) return;

    let vacio = estado.indexOf("");
    let filas = 4;
    let col = indice % filas;
    let fila = Math.floor(indice / filas);
    let colVacio = vacio % filas;
    let filaVacio = Math.floor(vacio / filas);
    
    if ((Math.abs(col - colVacio) === 1 && fila === filaVacio) ||
        (Math.abs(fila - filaVacio) === 1 && col === colVacio)) {
        [estado[indice], estado[vacio]] = [estado[vacio], estado[indice]];
        dibujar();
        verificar();
    }
}

function verificar() {
    if (JSON.stringify(estado) === JSON.stringify(piezas)) {
        mensaje.innerText = " 🎉 ¡Felicidades! Completaste el rompecabezas.";
        clearInterval(intervaloCronometro);
        juegoActivo = false;
        mostrarDialogo("¡Victoria!", "🎉 ¡Felicidades! Completaste el rompecabezas a tiempo. ¡Eres un genio!");
    }
}

function iniciarJuego() {
    if (juegoActivo) return;
    
    tiempo = 300;
    
    intervaloCronometro = setInterval(() => {
        if (tiempo > 0) {
            tiempo--;
            let min = Math.floor(tiempo / 60);
            let sec = tiempo % 60;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            cronometroDisplay.innerText = min + ":" + sec;
        } else {
            clearInterval(intervaloCronometro);
            juegoActivo = false;
            mostrarDialogo("¡Derrota!", "⏰ ¡Tiempo terminado! Perdiste el juego. ¿Quieres intentarlo de nuevo?");
        }
    }, 1000);
    
    juegoActivo = true;
    mensaje.innerText = "";
    estado = mezclar(piezas);
    dibujar();
}

function reiniciar() {
    clearInterval(intervaloCronometro);
    juegoActivo = false;
    tiempo = 300;
    cronometroDisplay.innerText = "05:00";
    mensaje.innerText = "";
    estado = mezclar(piezas);
    dibujar();
    dialogo.style.display = "none";
    dialogoCuadro.style.display = "none";
}

function mostrarDialogo(titulo, mensaje) {
    dialogoTitulo.innerText = titulo;
    dialogoMensaje.innerText = mensaje;
    dialogo.style.display = "block";
    dialogoCuadro.style.display = "block";
}

function cerrarDialogo() {
    dialogo.style.display = "none";
    dialogoCuadro.style.display = "none";
    reiniciar();
}

function alCargarPagina() {
    reiniciar();
}

document.addEventListener("DOMContentLoaded", alCargarPagina);