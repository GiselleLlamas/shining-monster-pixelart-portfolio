// ===== Funcionamiento de Flecha de arriba ==== 

function topFunction() {
	// Reset the main page scroll and any internal scrolling containers.
	const targets = [
		document.scrollingElement,
		document.documentElement,
		document.body,
		document.getElementById('parallaxHome'),
		...document.querySelectorAll('.parallax')
	];

	window.scrollTo(0, 0);

	targets.forEach(function (target) {
		if (!target) return;
		target.scrollTop = 0;
		target.scrollLeft = 0;
		if (typeof target.scrollTo === 'function') {
			target.scrollTo(0, 0);
		}
	});

	// One extra frame helps mobile browsers that apply scrolling asynchronously.
	requestAnimationFrame(function () {
		window.scrollTo(0, 0);
	});
}

function resolveElement(target) {
	if (!target) return null;
	if (typeof target === 'string') return document.querySelector(target);
	return target;
}

function setHtml(target, html) {
	const el = resolveElement(target);
	if (!el) return;
	el.innerHTML = html;
}

function getFadeDuration(speed) {
	if (typeof speed === 'number') return speed;
	if (speed === 'slow') return 600;
	if (speed === 'fast') return 200;
	return 300;
}

function fadeIn(target, speed, callback) {
	const el = resolveElement(target);
	if (!el) {
		if (typeof callback === 'function') callback();
		return;
	}

	const duration = getFadeDuration(speed);
	const computed = window.getComputedStyle(el);
	if (computed.display === 'none') {
		el.style.display = el.dataset.fadeDisplay || '';
		if (window.getComputedStyle(el).display === 'none') {
			el.style.display = 'block';
		}
	}

	el.style.transition = 'none';
	el.style.opacity = '0';

	requestAnimationFrame(function () {
		el.style.transition = 'opacity ' + duration + 'ms ease';
		el.style.opacity = '1';
	});

	window.setTimeout(function () {
		el.style.transition = '';
		if (typeof callback === 'function') callback();
	}, duration + 20);
}

function fadeOut(target, speed, callback) {
	const el = resolveElement(target);
	if (!el) {
		if (typeof callback === 'function') callback();
		return;
	}

	const duration = getFadeDuration(speed);
	const computed = window.getComputedStyle(el);
	if (computed.display !== 'none') {
		el.dataset.fadeDisplay = computed.display;
	}

	el.style.transition = 'opacity ' + duration + 'ms ease';
	el.style.opacity = '0';

	window.setTimeout(function () {
		el.style.transition = '';
		el.style.display = 'none';
		if (typeof callback === 'function') callback();
	}, duration + 20);
}

// ===== Image Loading Hints (site-wide) =====
(function () {
    var firstNonLogoKeptEager = false;

    function shouldSkipLazy(img) {
        var src = (img.getAttribute('src') || '').toLowerCase();
        return src.indexOf('ps-logo.png') !== -1;
    }

    function applyHints(img) {
        if (!img || img.tagName !== 'IMG') return;

        if (!img.getAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }

        if (img.getAttribute('loading')) return;
        if (shouldSkipLazy(img)) return;

        if (!firstNonLogoKeptEager) {
            firstNonLogoKeptEager = true; // keep one likely above-the-fold image eager
            return;
        }

        img.setAttribute('loading', 'lazy');
    }

    function applyAll(root) {
        if (!root) return;
        if (root.tagName === 'IMG') applyHints(root);
        root.querySelectorAll && root.querySelectorAll('img').forEach(applyHints);
    }

    // Apply to current DOM
    applyAll(document);

    // Apply as parser/app scripts add images
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            m.addedNodes.forEach(function (n) {
                if (n.nodeType === 1) applyAll(n);
            });
        });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    window.addEventListener('load', function () {
        applyAll(document);
        observer.disconnect();
    });
}());

// ===== Galeria ==== 

let imgActual = 1;
		
function textoAparece(texto){
	const varTexto = '#' + texto;
	//console.log(varTexto)
	fadeIn(varTexto, 'fast');
}

function textoDesaparece(texto){
	const varTexto = '#' + texto;
	//console.log(varTexto)
	fadeOut(varTexto, 'fast');
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
	fadeIn('#fondoGaleria', 'fast');
	imgActual = varImg;
	let contenidoHtml = '<img src="img/img' + imgActual + '.png" alt="Imagen de galer\u00eda, ilustraci\u00f3n creada por Giselle Llamas." />';
	document.getElementById('contenedorFotoPopUp').innerHTML = '';
	document.getElementById('contenedorFotoPopUp').innerHTML = contenidoHtml;
	fadeIn('#popUpGaleria', 'slow');
}

function desapareceGaleria(){
	fadeOut('#fondoGaleria', 'slow');
	fadeOut('#popUpGaleria', 'fast');
}

function iniciarCierreGaleriaFuera(){
	const fondo = document.getElementById('fondoGaleria');
	const popUp = document.getElementById('popUpGaleria');
	const fotoPopUp = document.getElementById('fotoPopUp');

	if (fondo) {
		fondo.addEventListener('click', function () {
			desapareceGaleria();
		});
	}

	if (!popUp || !fotoPopUp) return;

	popUp.addEventListener('click', function (e) {
		const clicDentroDeFoto = fotoPopUp.contains(e.target);
		const clicEnFlechas = e.target.closest('#flechaPrevPopUp, #flechaNextPopUp');

		if (!clicDentroDeFoto && !clicEnFlechas) {
			desapareceGaleria();
		}
	});
}

function iniciarSwipeGaleria(){
	const contenedor = document.getElementById('contenedorFotoPopUp');
	if (!contenedor) return;

	let startX = 0;
	let startY = 0;
	let isSwiping = false;

	contenedor.addEventListener('touchstart', function (e) {
		if (!e.touches || e.touches.length !== 1) return;
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
		isSwiping = true;
	}, { passive: true });

	contenedor.addEventListener('touchmove', function (e) {
		if (!isSwiping || !e.touches || e.touches.length !== 1) return;
		const dx = e.touches[0].clientX - startX;
		const dy = e.touches[0].clientY - startY;
		if (Math.abs(dx) > Math.abs(dy)) {
			e.preventDefault();
		}
	}, { passive: false });

	contenedor.addEventListener('touchend', function (e) {
		if (!isSwiping || !e.changedTouches || e.changedTouches.length !== 1) return;
		const dx = e.changedTouches[0].clientX - startX;
		const dy = e.changedTouches[0].clientY - startY;
		isSwiping = false;

		if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

		if (dx < 0) {
			nextImg(imgActual);
		} else {
			prevImg(imgActual);
		}
	}, { passive: true });
}

function iniciarProteccionImagenes(){
	document.addEventListener('contextmenu', function (e) {
		if (e.target.closest('img')) {
			e.preventDefault();
		}
	}, { capture: true });

	document.addEventListener('dragstart', function (e) {
		if (e.target.closest('img')) {
			e.preventDefault();
		}
	}, { capture: true });

	document.addEventListener('selectstart', function (e) {
		if (e.target.closest('img')) {
			e.preventDefault();
		}
	}, { capture: true });
}

function actualizarCopyrightFooter(){
	const anioActual = new Date().getFullYear();

	document.querySelectorAll('footer').forEach(function (footer) {
		const parrafos = footer.querySelectorAll('p');
		if (parrafos.length < 2) return;

		parrafos[parrafos.length - 1].textContent = '© ' + anioActual + ' Giselle Llamas';
	});
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
	
	setHtml('#muestraMov', texto);
	
}

function desempatar(){
	fadeOut('#contenedorResultadoDosJugadores', 'fast', function (){
		const texto = '';
		setHtml('#contenedorResultadoDosJugadores', texto);
		juegoEmpezado = 0;
		mostrarJuego(2);
	});
}

function iniciarInstruccionesMemotest() {
	const popup = document.getElementById('popupInstruccionesJuego');
	if (!popup) return;

	const botonInfo = document.getElementById('btnInfoJuego');
	const botonCerrar = document.getElementById('cerrarInstruccionesJuego');

	function abrirInstrucciones() {
		popup.setAttribute('aria-hidden', 'false');
		if (botonInfo) botonInfo.setAttribute('aria-expanded', 'true');
	}

	function cerrarInstrucciones() {
		popup.setAttribute('aria-hidden', 'true');
		if (botonInfo) botonInfo.setAttribute('aria-expanded', 'false');
	}

	function alternarInstrucciones() {
		if (popup.getAttribute('aria-hidden') === 'true') {
			abrirInstrucciones();
		} else {
			cerrarInstrucciones();
		}
	}

	if (botonInfo) {
		botonInfo.addEventListener('click', alternarInstrucciones);
	}

	if (botonCerrar) {
		botonCerrar.addEventListener('click', cerrarInstrucciones);
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'i' || e.key === 'I') {
			e.preventDefault();
			alternarInstrucciones();
		}

		if (e.key === 'Escape' && popup.getAttribute('aria-hidden') === 'false') {
			cerrarInstrucciones();
		}
	});

	abrirInstrucciones();
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
	
	setHtml('#turnoJugador', '&nbsp;');
	
	setHtml('#contenedorResultadoDosJugadores', texto);
	
	setTimeout(function () {
		fadeOut('#grillaJuego', 'fast');

		fadeIn('#contenedorResultadoDosJugadores', 'slow');

	}, 600);
	
}

function mostrarJuego(jugadores){
	
	
	setearVariablesIniciales();
	
	cantJugadores = jugadores;
	
	
	if(juegoEmpezado == 0){
		fadeOut('#menuInicial', 'fast');
		juegoEmpezado = 1;
		
		if(cantJugadores == 2){
			
			jugadorActual = 1;
			
		const textoMostrarTurno = '<h2>Turno Jugador 1</h2><img src="img/unJugador.png" alt="un jugador" />';
			setHtml('#mostrarTurno', textoMostrarTurno);
			
			fadeIn('#mostrarTurno', 'fast');
			
			setTimeout(function () {
				fadeOut('#mostrarTurno', 'fast', function(){
					setHtml('#turnoJugador', 'Turno Jugador 1');
				});
			}, 1500);
			
		}
	}else{
		
		jugadorActual = 2;
		
		const textoMostrarTurno = '<h2>Turno Jugador 2</h2><img src="img/jugadorDos.png" alt="un jugador" />';
		setHtml('#mostrarTurno', textoMostrarTurno);

		fadeIn('#mostrarTurno', 'fast');
			
		setTimeout(function () {
			fadeOut('#mostrarTurno', 'fast', function(){
				setHtml('#turnoJugador', 'Turno Jugador 2');
			});
		}, 1500);
		
	}
	
	mezclarCartas(cartas);
	let contenido = "";
	
	setHtml('#grillaJuego', contenido);
	
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
	
	setHtml('#grillaJuego', contenido);	
	
	if(cantJugadores == 2){
		setTimeout(function () {
			fadeIn('#grillaJuego', 'fast');
			mostrarMovimientos();
		}, 1500);	
	}else{
		fadeIn('#grillaJuego', 'fast');
	}
	
	
	
}

function mostrarCarta(numeroCarta, numeroMatch){
	const idCarta = "#carta" + numeroCarta; 
	fadeOut(idCarta, 'fast');
	if(paso == 0){
		primerMatch = numeroMatch;
		primeraCarta = numeroCarta;
		paso = 1;
	}else{
		if( numeroMatch != primerMatch){
			const cartaAnterior = "#carta" + primeraCarta;
			const cartaActual = "#carta" + numeroCarta;
			setTimeout(function () {
				fadeIn(cartaAnterior, 'fast');
				fadeIn(cartaActual, 'fast');
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
				fadeOut('#grillaJuego', 'slow');

				setHtml('#movimientos1', movimientos);

				fadeIn('#contenedorResultadoUnJugador', 'fast');

			}, 600);
		}else{
			setHtml('#turnoJugador', '&nbsp;');
			if(jugadorActual == 1){
				movimientosJug1 = movimientos;
				setTimeout(function () {
					fadeOut('#grillaJuego', 'fast', function(){
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
	const contenedor = document.getElementById('contenidoProyectos');
	if (!contenedor) return;
	contenedor.scrollTo({ top: pos, behavior: 'smooth' });
}

// ===== Parallax Hero (Home page) =====
// Applies a subtle per-layer vertical translate driven by page scroll.
// Uses the CSS `translate` individual-transform property so it never
// conflicts with the `transform: translateX(-50%)` centering on layers.
// Does nothing when prefers-reduced-motion is set.

(function () {
	var layerDefs = [
		{ sel: '#pantallaArcade1',  factor: 0.08 },
		{ sel: '#chicosArcade',     factor: 0.18 }
	];

	var layers = [];
	var raf = null;
	var lastY = 0;
	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var heroEl = null;

	function init() {
		if (reducedMotion) return;
		heroEl = document.getElementById('parallaxHome');
		layerDefs.forEach(function (def) {
			var el = document.querySelector(def.sel);
			if (el) layers.push({ el: el, factor: def.factor });
		});
		if (layers.length === 0) return;
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	function onScroll() {
		/* Clamp to hero height so translate never exceeds factor×heroHeight.
		   This keeps feet below overflow:hidden even at full-page scroll. */
		var maxY = heroEl ? heroEl.offsetHeight : window.scrollY;
		lastY = Math.min(window.scrollY, maxY);
		if (!raf) raf = requestAnimationFrame(update);
	}

	function update() {
		raf = null;
		layers.forEach(function (layer) {
			layer.el.style.translate = '0px ' + -(lastY * layer.factor) + 'px';
		});
	}

	document.addEventListener('DOMContentLoaded', init);
}());

// ===== Menú Hamburguesa =====

document.addEventListener('DOMContentLoaded', function () {
	iniciarProteccionImagenes();
	actualizarCopyrightFooter();
	iniciarSwipeGaleria();
	iniciarCierreGaleriaFuera();
	iniciarInstruccionesMemotest();
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
