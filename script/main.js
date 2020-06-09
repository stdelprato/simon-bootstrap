let movimientosComputadora = [];
let movimientosUsuario = [];
let ronda = 0;

document.querySelector('button[type=button]').onclick = empezarJuego;

actualizarEstado("Tocá 'jugar' para arrancar.");
actualizarNumeroRonda('-');
bloquearInputUsuario();

function empezarJuego(){
    resetear();
    manejarRonda();
}

function resetear(){
    movimientosComputadora = [];
    movimientosUsuario = [];
    ronda = 0;
}

function manejarRonda(){
    chequearJuegoGanado();

    actualizarEstado("Turno de la computadora");
    bloquearInputUsuario();

    const $nuevoCuadro = cuadroRandom();
    movimientosComputadora.push($nuevoCuadro);

    const delayTurnoJugador = (movimientosComputadora.length + 1) * 1000;

    movimientosComputadora.forEach(function($cuadro, i){
        const tiempoMilisegundos = (i + 1) * 1000;
        setTimeout(function(){
            resaltarColor($cuadro);
        }, tiempoMilisegundos);
    });

    setTimeout(function(){
        actualizarEstado("Turno del usuario");
        desbloquearInputUsuario();
    }, delayTurnoJugador);

    movimientosUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function bloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
        $cuadro.onclick = function(){};
    });
}

function desbloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
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

function chequearJuegoGanado(){
    if(movimientosComputadora.length === 2){
        ganar();
        return;
    }
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
        setTimeout(manejarRonda, 1000);
    }
}

function cuadroRandom(){
    const $cuadros = document.querySelectorAll('.cuadro');
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
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-primary');
    }
}