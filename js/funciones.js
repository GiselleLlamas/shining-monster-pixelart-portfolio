// ===== Funcionamiento de Flecha de arriba ==== 

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// ===== Galeria ==== 

let imgActual = 1;
		
function textoAparece(texto){
	const varTexto = '#' + texto;
	//console.log(varTexto)
	$(varTexto).fadeIn('fast');
}

function textoDesaparece(texto){
	const varTexto = '#' + texto;
	//console.log(varTexto)
	$(varTexto).fadeOut('fast');
}

function prevImg(varImg){
	let contenidoHtml = '';
	if(varImg == 1){
		contenidoHtml = '<img src="img/img' + 9 + '.png" alt="Imagen de galería, ilustración creada por Giselle Llamas." />';
		imgActual = 9;
	}else{
		varImg = varImg - 1;
		contenidoHtml = '<img src="img/img' + varImg + '.png" alt="Imagen de galería, ilustración creada por Giselle Llamas." />';
		imgActual = imgActual - 1;
	}
	document.getElementById('contenedorFotoPopUp').innerHTML = '';
	document.getElementById('contenedorFotoPopUp').innerHTML = contenidoHtml;

}

function nextImg(varImg){
	let contenidoHtml = '';
	if(varImg == 9){
		contenidoHtml = '<img src="img/img' + 1 + '.png" alt="Imagen de galería, ilustración creada por Giselle Llamas." />';
		imgActual = 1;
	}else{
		varImg = varImg + 1;
		contenidoHtml = '<img src="img/img' + varImg + '.png" alt="Imagen de galería, ilustración creada por Giselle Llamas." />';
		imgActual = imgActual + 1;
	}
	document.getElementById('contenedorFotoPopUp').innerHTML = '';
	document.getElementById('contenedorFotoPopUp').innerHTML = contenidoHtml;
}

function apareceGaleria(varImg){
	$('#fondoGaleria').fadeIn('fast');
	imgActual = varImg;
	let contenidoHtml = '<img src="img/img' + imgActual + '.png" alt="Imagen de galer\u00eda, ilustraci\u00f3n creada por Giselle Llamas." />';
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

const cartas = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];

let paso = 0;

let movimientos = 0;

let movimientosJug1 = 0;
let movimientosJug2 = 0;

let jugadorActual;

let primeraCarta;
let primerMatch;

let pares = 10;

let cantJugadores = 0;

let juegoEmpezado = 0;

function setearVariablesIniciales(){
	paso = 0;

	movimientos = 0;

	primeraCarta = '';
	primerMatch = '';

	pares = 10;
}

function mezclarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function mostrarMovimientos(){
	let texto;
	if(pares > 0){
		texto = "<h2>Movimientos: " + movimientos + '</h2>';
		
	}else{
		texto = "<h2>&nbsp;</h2>";
	}
	
	$("#muestraMov").html(texto);
	
}

function desempatar(){
	$('#contenedorResultadoDosJugadores').fadeOut('fast', function (){
		const texto = '';
		$("#contenedorResultadoDosJugadores").html(texto);
		juegoEmpezado = 0;
		mostrarJuego(2);
	});
}

function mostrarResultadoFinal(){
	let texto;
	if(movimientosJug1 < movimientosJug2){
		
		texto = '<h2>¡Gana el jugador 1!</h2>';
		texto = texto + '<img src="img/unJugador.png" alt="jugador uno" />';
		texto = texto + '<p>Resultado de movimientos:</p>';
		texto = texto + '<h1 id="movimientos2">' + movimientosJug1 + ' a ' + movimientosJug2 + '</h1>';
		texto = texto + '<div class="volverJugar" onclick="location.reload();"><p>Jugar de nuevo</p></div>';
		
	}else if(movimientosJug1 > movimientosJug2){
		
		texto = '<h2>¡Gana el jugador 2!</h2>';
		texto = texto + '<img src="img/jugadorDos.png" alt="jugador dos" />';
		texto = texto + '<p>Resultado de movimientos:</p>';
		texto = texto + '<h1 id="movimientos2">' + movimientosJug2 + ' a ' + movimientosJug1 + '</h1>';
		texto = texto + '<div class="volverJugar" onclick="location.reload();"><p>Jugar de nuevo</p></div>';
			 
	}else{
		texto = '<h2>¡Hay un empate!</h2>';
		texto = texto + '<img src="img/dosJugadores.png" alt="Empate" />';
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
			
		const textoMostrarTurno = '<h2>Turno Jugador 1</h2><img src="img/unJugador.png" alt="un jugador" />';
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
		
		const textoMostrarTurno = '<h2>Turno Jugador 2</h2><img src="img/jugadorDos.png" alt="un jugador" />';
		$("#mostrarTurno").html(textoMostrarTurno);

		$("#mostrarTurno").fadeIn('fast');
			
		setTimeout(function () {
			$("#mostrarTurno").fadeOut('fast', function(){
				$("#turnoJugador").html('Turno Jugador 2');
			});
		}, 1500);
		
	}
	
	mezclarCartas(cartas);
	let contenido = "";
	
	$("#grillaJuego").html(contenido);
	
	let idCarta = 0;
	for (let i = 0; i < cartas.length; i++) {
		const texto = cartas[i];
		contenido = contenido + '<div class="celdaJuego">';
		
			contenido = contenido + '<div class="idCarta" id="carta' + idCarta + '" onclick="mostrarCarta(' + idCarta + ',' + texto + ')">';
		
				if(cantJugadores == 1 || jugadorActual == 1){
				   contenido = contenido + '<img src="img/pokebola.png" alt="Dibujo de una pokebola." />';
				}else{
					contenido = contenido + '<img src="img/masterball.png" alt="Dibujo de una masterball." />';   
				}
				
			contenido = contenido + '</div>';
		
			contenido = contenido + '<div class="imgJuego">';
				contenido = contenido + '<img src="img/img' + texto + '.png" alt="Dibujo de un pókemon." />';
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
	const idCarta = "#carta" + numeroCarta; 
	$(idCarta).fadeOut('fast');
	if(paso == 0){
		primerMatch = numeroMatch;
		primeraCarta = numeroCarta;
		paso = 1;
	}else{
		if( numeroMatch != primerMatch){
			const cartaAnterior = "#carta" + primeraCarta;
			const cartaActual = "#carta" + numeroCarta;
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

/*******************************************
********************************************
*******************************************/
/*Proyectos*/
/*******************************************
********************************************
*******************************************/

function animarScroll(pos){
	$("#contenidoProyectos").animate({ scrollTop: pos }, 1000); 
}

// ===== Menú Hamburguesa =====

document.addEventListener('DOMContentLoaded', function () {
	const hamburger = document.querySelector('.hamburger');
	const menu = document.querySelector('.menu');
	document.body.classList.remove('menu-open');

	if (hamburger && menu) {
		hamburger.addEventListener('click', function () {
			hamburger.classList.toggle('is-open');
			menu.classList.toggle('is-open');
			document.body.classList.toggle('menu-open', menu.classList.contains('is-open'));
		});
	}

	// En mobile, el ícono de caret abre el dropdown; el link del texto navega normalmente
	document.querySelectorAll('.dropbtn .fa-caret-down').forEach(function (caret) {
		caret.addEventListener('click', function (e) {
			if (window.innerWidth <= 768) {
				e.preventDefault();
				e.stopPropagation();
				caret.closest('.dropdown').classList.toggle('is-open');
			}
		});
	});
});
