'use strict'

var palabras=["HOLA","MUNDO","HOGAR","TECLADO","BUZON","CINTURON"]

var palabraAgregar="";
var palabra = "";
var letrasEscritas = "";
var errores = 0;

//obtengo las secciones para mostrar
var bienvenida = document.getElementById("bienvenida");
var durante_juego = document.getElementById("durante-juego");
var nueva_palabra = document.getElementById("nueva-palabra");

//obtengo datos del textarea
var agregaPalabra=document.getElementById("text-nueva-palabra");

//inicia página
muestraBienvenida();

//#region Eventos

bienvenida.addEventListener("click", (e) => {
    console.log(e);
    if (e.target.id == 'iniciar-juego') {
        muestraNuevoJuego();
    }
    if (e.target.id == 'agregar-palabra') {
        muestraNuevaPalabra();
    }
});

durante_juego.addEventListener("click", (e) => {
    console.log(e);
    if (e.target.id == 'cancelar-desistir') {
        muestraBienvenida();
    } if (e.target.id == 'juego-nuevo') {
        muestraNuevoJuego();
    }
});

nueva_palabra.addEventListener("click", (e) => {
    if (e.target.id == 'cancelar-desistir') {
        muestraBienvenida();
    }
    if (e.target.id == 'guardar-jugar') {
        guardaPalabra();
    }
});

document.addEventListener("keydown", (e) => {
    if ((e.key >= "A") && (e.key <= "Z")) {
        if (e.key.length < 2) {
            console.log(e.key);
            revisaLetra(e.key);
        }
    }
});


agregaPalabra.addEventListener("change",(e)=>{
    palabraAgregar=e.target.value;
});


//#endregion

//#region Funciones

function muestraBienvenida() {
    bienvenida.style.visibility = "visible";
    bienvenida.style.width = "90%";
    bienvenida.style.height = "100%";

    durante_juego.style.visibility = "hidden"
    durante_juego.style.width = "1%";
    durante_juego.style.height = "1px";

    nueva_palabra.style.visibility = "hidden";
    nueva_palabra.style.width = "1%";
    nueva_palabra.style.height = "1px";
}

function muestraNuevaPalabra() {
    nueva_palabra.style.visibility = "visible";
    nueva_palabra.style.width = "90%";
    nueva_palabra.style.height = "100%";

    durante_juego.style.visibility = "hidden"
    durante_juego.style.width = "1%";
    durante_juego.style.height = "1px";

    bienvenida.style.visibility = "hidden";
    bienvenida.style.width = "1%";
    bienvenida.style.height = "1px";

}

function muestraNuevoJuego() {
    durante_juego.style.visibility = "visible";
    durante_juego.style.width = "90%";
    durante_juego.style.height = "100%";

    nueva_palabra.style.visibility = "hidden"
    nueva_palabra.style.width = "1%";
    nueva_palabra.style.height = "1px";

    bienvenida.style.visibility = "hidden";
    bienvenida.style.width = "1%";
    bienvenida.style.height = "1px";
    quitaLetrasCorrectas();
    iniciaJuego();
}

function iniciaJuego() {
    const num=Math.floor(Math.random()*palabras.length);
    console.log(num)
    palabra=palabras[num];
    errores=0;
    limpiaCanvas();
    crearGuionesDePalabra(palabra);
}

function crearGuionesDePalabra(palabra) {
    for (let index = 0; index < palabra.length; index++) {
        var letrasCorrectas = document.getElementById('letras-correctas');
        letrasCorrectas.innerHTML += "<input type='text' value='' class='letra-correcta' disabled/>"
    }
}

function quitaLetrasCorrectas() {
    var letrasCorrectas = document.getElementById('letras-correctas');
    var child = letrasCorrectas.lastElementChild;
    while (child) {
        letrasCorrectas.removeChild(child);
        child = letrasCorrectas.lastElementChild;
    }
    var letraIncorrecta = document.getElementsByClassName('letra-incorrecta');
    letraIncorrecta[0].value="";
}

function cancelarDesistir() {
    muestraBienvenida();
}

function revisaLetra(letra) {
    if (!revisaLetraEscritaPreviamente(letra)) {
        var esCorrecta = false;
        for (let index = 0; index < palabra.length; index++) {
            const element = palabra[index];
            if (element == letra) {
                var letrasCorrectas = document.getElementsByClassName('letra-correcta');
                letrasCorrectas[index].value = letra;
                esCorrecta = true;
            }
        }
        if (!esCorrecta) {
            var letraIncorrecta = document.getElementsByClassName('letra-incorrecta');
            letraIncorrecta[0].value += letra;
            dibujaAhorcado();
        }
        revisaVictoria();
    }


}

function revisaLetraEscritaPreviamente(letra) {
    var contiene = false;
    for (let index = 0; index < letrasEscritas.length; index++) {
        if (letrasEscritas[index] == letra) {
            contiene = true;
        }
    }
    if (!contiene) {
        letrasEscritas += letra;
    }
    return contiene;
}

function dibujaAhorcado() {
    var canvas = document.querySelector("canvas");
    var pincel = canvas.getContext("2d");
    pincel.fillStyle = "black";
    pincel.beginPath();
    switch (errores) {
        case 0:
            pincel.fillRect(30, 145, 250, 2);//base
            break;
        case 1:
            pincel.fillRect(110, 10, 2, 135);//poste
            break;
        case 2:
            pincel.fillRect(110, 10, 100, 2); //techo
            break;
        case 3:
            pincel.fillRect(210, 10, 2, 25);  //lazo
            break;
        case 4:
            pincel.arc(211, 50, 15, 0, 2 * Math.PI);//cabeza
            pincel.stroke();//cabeza
            break;
        case 5:
            pincel.fillRect(210, 65, 2, 40);//cuerpo
            break;
        case 6:
            pincel.moveTo(210, 75);//mano izquierda
            pincel.lineTo(190, 70);//mano izquierda
            pincel.stroke();//mano izquierda
            break;
        case 7:
            pincel.moveTo(210, 75);  //mano derecha
            pincel.lineTo(230, 70);  //mano derecha
            pincel.stroke();        //mano derecha
            break;
        case 8:
            pincel.moveTo(210, 105);//pie izquierdo
            pincel.lineTo(195, 115); //pie izquierdo
            pincel.stroke();        //pie izquierdo
            break;
        case 9:
            pincel.moveTo(210, 105); //pie derecho
            pincel.lineTo(225, 115); //pie derecho
            pincel.stroke();        //Pie derecho
    }
    errores++;

}

function limpiaCanvas(){
    var canvas = document.querySelector("canvas");
    var pincel = canvas.getContext("2d");
    pincel.clearRect(0,0,canvas.width,canvas.height);
    document.getElementById("Mensaje-Final").innerHTML = "";
    letrasEscritas="";
}

function revisaVictoria() {
    var cuentaVacios = 0;
    var letrasCorrectas = document.getElementsByClassName('letra-correcta');
    for (let index = 0; index < letrasCorrectas.length; index++) {
        if (letrasCorrectas[index].value == '') {
            cuentaVacios++;
        }
    }
    if (cuentaVacios == 0) {
        document.getElementById("Mensaje-Final").innerHTML = "Has ganado";
        document.getElementById("Mensaje-Final").style.color="green";
    } else if (errores > 9) {
        document.getElementById("Mensaje-Final").innerHTML = "Has perdido";
        document.getElementById("Mensaje-Final").style.color="red";
    }
}

function guardaPalabra() {
    if(palabraAgregar.length<=8){
        palabras.push(palabraAgregar);
    }

    muestraNuevoJuego();
}



//#endregion