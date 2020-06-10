let movimientosComputadora = [];
let movimientosUsuario = [];
let ronda = 0;

document.querySelector('#jugar-boton').onclick = empezarJuego;

actualizarEstado("Tocá 'empezar' para arrancar.");
actualizarNumeroRonda('-');
bloquearInputUsuario();

document.querySelector("#cambiar-dificultad-boton").onclick = function(){
    ocultarJuego();
    mostrarDificultades();
    resetear();
    clearTimeout(timeoutMovimientoComputadora);
    clearTimeout(timeoutMovimientoJugador);
    return false;
}

function empezarJuego(){
    resetear();
    manejarRonda();
}

function resetear(){
    movimientosComputadora = [];
    movimientosUsuario = [];
    ronda = 0;
    actualizarEstado("Tocá 'empezar' para arrancar.");
    actualizarNumeroRonda('-');
    bloquearInputUsuario();
}

let timeoutMovimientoComputadora;
let timeoutMovimientoJugador;

function manejarRonda(){
    actualizarEstado("Turno de la computadora");
    bloquearInputUsuario();

    const $nuevoCuadro = cuadroRandom();
    movimientosComputadora.push($nuevoCuadro);

    const delayTurnoJugador = (movimientosComputadora.length + 1) * 1000;

    timeoutMovimientoComputadora = movimientosComputadora.forEach(function(cuadro, i){
        const tiempoMilisegundos = (i + 1) * 1000;
        setTimeout(function(){
            resaltarColor(cuadro);
        }, tiempoMilisegundos);
    });

    timeoutMovimientoJugador = setTimeout(function(){
        actualizarEstado("Turno del usuario");
        desbloquearInputUsuario();
    }, delayTurnoJugador);

    movimientosUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function bloquearInputUsuario(){
    document.querySelectorAll('.circulo').forEach(function($cuadro){
        $cuadro.onclick = function(){};
    });
}

function desbloquearInputUsuario(){
    document.querySelectorAll('.circulo').forEach(function($cuadro){
        $cuadro.onclick = manejarInputUsuario;
    })
}

function ganar(){
    bloquearInputUsuario();
    resetear();
    actualizarEstado("Ganaste! Apreta el boton para volver a jugar.", error = false, victoria = true);
}

function perder(){
    bloquearInputUsuario();
    resetear();
    actualizarEstado("Perdiste, apreta el boton para volver a jugar.", error = true);
}

function manejarInputUsuario(event){
    const $cuadro = event.target;
    resaltarColor($cuadro);
    movimientosUsuario.push($cuadro);

    const $cuadroComputadora = movimientosComputadora[movimientosUsuario.length - 1];
    if($cuadro.id !== $cuadroComputadora.id){
        perder();
        return;
    }

    if(movimientosUsuario.length === movimientosComputadora.length){
        bloquearInputUsuario();
        if(movimientosComputadora.length === cantidadRondas){
            ganar();
            return;
        } else {
            setTimeout(manejarRonda, 1000);
        }
    }
}

function cuadroRandom(){
    const $cuadros = document.querySelectorAll('.circulo');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
}

function resaltarColor($cuadro){
    $cuadro.style.opacity = 1;
    setTimeout(function(){
        $cuadro.style.opacity = 0.5;
    }, 500);
}

function actualizarNumeroRonda(ronda){
    document.querySelector('#ronda').textContent = ronda;
}

function actualizarEstado(estado, error = false, victoria = false){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
    if(error){
        $estado.classList.remove('alert-primary');
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    } else if(victoria) {
        $estado.classList.remove('alert-danger');
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-success');
    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.remove('alert-success');
        $estado.classList.add('alert-primary');
    }
}

let cantidadRondas;

function determinarDificultad(boton){
    switch(boton.id){
        case 'facil':
            cantidadRondas = 5;
            break;
        case 'intermedio':
            cantidadRondas = 10;
            break;
        case 'dificil':
            cantidadRondas = 15;
            break;
    }
    
    document.querySelector("#dificultades").onclick = function(){
        mostrarJuego();
        ocultarDificultades();

        document.querySelector("#cant-rondas-dificultad").textContent = cantidadRondas;
    }
}

function mostrarJuego(){
    document.querySelector("#juego").className = "";
}

function ocultarJuego(){
    document.querySelector("#juego").className = "oculto";
}

function mostrarDificultades(){
    document.querySelector("#container-dificultad").className = "";
}

function ocultarDificultades(){
    document.querySelector("#container-dificultad").className = "oculto";
}