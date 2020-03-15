// ===== Funcionamiento de Flecha de arriba ==== 

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var imgActual = 1;
		
function textoAparece(texto){
	varTexto = '#' + texto;
	//console.log(varTexto)
	$(varTexto).fadeIn('fast');
}

function textoDesaparece(texto){
	varTexto = '#' + texto;
	//console.log(varTexto)
	$(varTexto).fadeOut('fast');
}

function prevImg(varImg){
	contenidoHtml = '';
	if(varImg == 1){
		contenidoHtml = '<img src="img/img' + 9 + '.png" alt="imagen" />';
		imgActual = 9;
	}else{
		varImg = varImg - 1;
		contenidoHtml = '<img src="img/img' + varImg + '.png" alt="imagen" />';
		imgActual = imgActual - 1;
	}
	document.getElementById('contenedorFotoPopUp').innerHTML = '';
	document.getElementById('contenedorFotoPopUp').innerHTML = contenidoHtml;

}

function nextImg(varImg){
	contenidoHtml = '';
	if(varImg == 9){
		contenidoHtml = '<img src="img/img' + 1 + '.png" alt="imagen" />';
		imgActual = 1;
	}else{
		varImg = varImg + 1;
		contenidoHtml = '<img src="img/img' + varImg + '.png" alt="imagen" />';
		imgActual = imgActual + 1;
	}
	document.getElementById('contenedorFotoPopUp').innerHTML = '';
	document.getElementById('contenedorFotoPopUp').innerHTML = contenidoHtml;
}

function apareceGaleria(varImg){
	$('#fondoGaleria').fadeIn('fast');
	imgActual = varImg;
	contenidoHtml = '<img src="img/img' + imgActual + '.png" alt="imagen" />';
	document.getElementById('contenedorFotoPopUp').innerHTML = '';
	document.getElementById('contenedorFotoPopUp').innerHTML = contenidoHtml;
	$('#popUpGaleria').fadeIn('slow');
}
function desapareceGaleria(){
	$('#fondoGaleria').fadeOut('slow');
	$('#popUpGaleria').fadeOut('fast');
}

/*******************************************
********************************************
*******************************************/
/*Memotest - Retro Memorias*/
/*******************************************
********************************************
*******************************************/

var cartas = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];

var paso = 0;

var movimientos = 0;

var movimientosJug1 = 0;
var movimientosJug2 = 0;

var jugadorActual;

var primeraCarta;
var primerMatch;

var pares = 10;

var cantJugadores = 0;

var juegoEmpezado = 0;

function setearVariablesIniciales(){
	paso = 0;

	movimientos = 0;

	primeraCarta = '';
	primerMatch = '';

	pares = 10;
}

function mezclarCartas(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function mostrarMovimientos(){
	if(pares > 0){
		texto = "<h2>Movimientos: " + movimientos + '</h2>';
		
	}else{
		texto = "<h2>&nbsp;</h2>";
	}
	
	$("#muestraMov").html(texto);
	
}

function desempatar(){
	$('#contenedorResultadoDosJugadores').fadeOut('fast', function (){
		texto = '';
		$("#contenedorResultadoDosJugadores").html(texto);
		juegoEmpezado = 0;
		mostrarJuego(2);
	});
}

function mostrarResultadoFinal(){
	if(movimientosJug1 < movimientosJug2){
		
		texto = '<h2>¡Gana el jugador 1!</h2>';
		texto = texto + '<img src="img/juego/unJugador.png" alt="jugador uno" />';
		texto = texto + '<p>Resultado de movimientos:</p>';
		texto = texto + '<h1 id="movimientos2">' + movimientosJug1 + ' a ' + movimientosJug2 + '</h1>';
		texto = texto + '<div class="volverJugar" onclick="location.reload();"><p>Jugar de nuevo</p></div>';
		
	}else if(movimientosJug1 > movimientosJug2){
		
		texto = '<h2>¡Gana el jugador 2!</h2>';
		texto = texto + '<img src="img/juego/jugadorDos.png" alt="jugador dos" />';
		texto = texto + '<p>Resultado de movimientos:</p>';
		texto = texto + '<h1 id="movimientos2">' + movimientosJug2 + ' a ' + movimientosJug1 + '</h1>';
		texto = texto + '<div class="volverJugar" onclick="location.reload();"><p>Jugar de nuevo</p></div>';
			 
	}else{
		texto = '<h2>¡Hay un empate!</h2>';
		texto = texto + '<img src="img/juego/dosJugadores.png" alt="Empate" />';
		texto = texto + '<p>Resultado de movimientos:</p>';
		texto = texto + '<h1 id="movimientos2">' + movimientosJug2 + ' a ' + movimientosJug1 + '</h1>';
		texto = texto + '<div class="volverJugar" onclick="desempatar();"><p>Desempatar</p></div>';
		texto = texto + '<div class="volverJugar" onclick="location.reload();"><p>Terminar</p></div>';
	}
	
	$("#turnoJugador").html('&nbsp;');
	
	$("#contenedorResultadoDosJugadores").html(texto);
	
	setTimeout(function () {
		$("#grillaJuego").fadeOut('fast');

		$('#contenedorResultadoDosJugadores').fadeIn('slow');

	}, 600);
	
}

function mostrarJuego(jugadores){
	
	
	setearVariablesIniciales();
	
	cantJugadores = jugadores;
	
	
	if(juegoEmpezado == 0){
		$("#menuInicial").fadeOut('fast');
		juegoEmpezado = 1;
		
		if(cantJugadores == 2){
			
			jugadorActual = 1;
			
			var textoMostrarTurno = '<h2>Turno Jugador 1</h2><img src="img/juego/unJugador.png" alt="un jugador" />';
			$("#mostrarTurno").html(textoMostrarTurno);
			
			$("#mostrarTurno").fadeIn('fast');
			
			setTimeout(function () {
				$("#mostrarTurno").fadeOut('fast', function(){
					$("#turnoJugador").html('Turno Jugador 1');
				});
			}, 1500);
			
		}
	}else{
		
		jugadorActual = 2;
		
		var textoMostrarTurno = '<h2>Turno Jugador 2</h2><img src="img/juego/jugadorDos.png" alt="un jugador" />';
		$("#mostrarTurno").html(textoMostrarTurno);

		$("#mostrarTurno").fadeIn('fast');
			
		setTimeout(function () {
			$("#mostrarTurno").fadeOut('fast', function(){
				$("#turnoJugador").html('Turno Jugador 2');
			});
		}, 1500);
		
	}
	
	mezclarCartas(cartas);
	var contenido = "";
	
	$("#grillaJuego").html(contenido);
	
	var idCarta = 0;
	for (i = 0; i < cartas.length; i++) {
		var texto = cartas[i];
		contenido = contenido + '<div class="celdaJuego">';
		
			contenido = contenido + '<div class="idCarta" id="carta' + idCarta + '" onclick="mostrarCarta(' + idCarta + ',' + texto + ')">';
		
				if(cantJugadores == 1 || jugadorActual == 1){
				   contenido = contenido + '<img src="img/juego/pokebola.png" alt="" />';
				}else{
					contenido = contenido + '<img src="img/juego/masterball.png" alt="" />';   
				}
				
			contenido = contenido + '</div>';
		
			contenido = contenido + '<div class="imgJuego">';
				contenido = contenido + '<img src="img/juego/img' + texto + '.png" alt="" />';
			contenido = contenido + '</div>';
		
		contenido = contenido + '</div>';
			
		idCarta++;
	}
	
	$("#grillaJuego").html(contenido);	
	
	if(cantJugadores == 2){
		setTimeout(function () {
			$("#grillaJuego").fadeIn('fast');
			mostrarMovimientos();
		}, 1500);	
	}else{
		$("#grillaJuego").fadeIn('fast');
	}
	
	
	
}

function mostrarCarta(numeroCarta, numeroMatch){
	idCarta = "#carta" + numeroCarta; 
	$(idCarta).fadeOut('fast');
	if(paso == 0){
		primerMatch = numeroMatch;
		primeraCarta = numeroCarta;
		paso = 1;
	}else{
		if( numeroMatch != primerMatch){
			cartaAnterior = "#carta" + primeraCarta;
			cartaActual = "#carta" + numeroCarta;
			setTimeout(function () {
				$(cartaAnterior).fadeIn('fast');
				$(cartaActual).fadeIn('fast');
			}, 600);
			
		}else{
			pares = pares -1;
		}
		movimientos++;
		mostrarMovimientos();
		paso = 0;
	}
	
	if(pares == 0){
		if(cantJugadores == 1){
			setTimeout(function () {
				$("#grillaJuego").fadeOut('slow');

				$('#movimientos1').html(movimientos);

				$('#contenedorResultadoUnJugador').fadeIn('fast');

			}, 600);
		}else{
			$("#turnoJugador").html('&nbsp;');
			if(jugadorActual == 1){
				movimientosJug1 = movimientos;
				setTimeout(function () {
					$("#grillaJuego").fadeOut('fast', function(){
						mostrarJuego(2);
					});
				}, 600);
			}else{
				movimientosJug2 = movimientos;
				mostrarResultadoFinal();
			}
		}
	}
}
