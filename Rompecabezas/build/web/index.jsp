<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Juego De Rompecabezas</title>
        <link rel="stylesheet" href="css/estilo.css"/>
    </head>
    <body>
        <video autoplay muted loop id="background-video" class="video-fondo">
            <source src="img/fondoRompecabezas.mp4" type="video/mp4">
            Tu navegador no soporta el video de fondo.
        </video>

        <div class="encabezado">
            <h2>PORSHE 4x4</h2>
            <img src="img/escudoporshe.png" alt="EscudoPorshe" class="logo">
        </div>
        
        <div id="cronometro" class="tiempo">05:00</div>
        
        <div class="Primer-Contenedor">
            <div class="container">
                <div id="puzzle" class="puzzle"></div>
                <p id="mensaje"></p>
                <div class="botones">
                    <button onclick="iniciarJuego()">Comenzar</button>
                    <button onclick="reiniciar()">Reiniciar</button>
                </div>
            </div>
            <div class="Imagen-De-Referencia">
                <h2>Imagen de Referencia</h2>
                <img src="img/porshe.jpg" alt="Imagen de referencia del rompecabezas" class="referencia">
            </div>
        </div>

        <div id="dialogoCuadro"></div>
        <div id="dialogo" class="dialogo">
            <h3 id="dialogoTitulo"></h3>
            <p id="dialogoMensaje"></p>
            <button onclick="cerrarDialogo()">Cerrar</button>
        </div>

        <script src="js/script.js"></script>
    </body>
</html>