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