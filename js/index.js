'use strict'

var bienvenida = document.getElementById("bienvenida");
var durante_juego = document.getElementById("durante-juego");
var nueva_palabra = document.getElementById("nueva-palabra");

durante_juego.innerHTML="<canvas class='dibuja-ahorcado'></canvas>"+
            "<div id='letras'>"+
                "<div class='letras-correctas'>"+
            "    </div>"+
            "    <div class='letras-incorrectas'>"+
            "    </div>"+
            "</div>"+
            "<button class='btn btn-azul'>Nuevo Juego</button>"+
            "<button class='btn btn-blanco'>Desistir</button>";
nueva_palabra.innerHTML="<textarea name='text-nueva-palabra' id='text-nueva-palabra' cols='30' rows='10' placeholder='Ingresa la nueva palabra'></textarea>"+
"<p class='advertencia'>Máximo 8 palabras</p>"+
"<button class='btn btn-azul'>Guardar y jugar</button>"+
"<button class='btn btn-blanco'>Cancelar</button>";