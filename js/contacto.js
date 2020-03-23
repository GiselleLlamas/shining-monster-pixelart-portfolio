$(document).ready(function () {
 	$('#formularioContacto').submit(function (e) {
  		e.preventDefault();
	});
});

function validarEmail(texto){
	var formatoEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(texto.match(formatoEmail)){
		return true;
	} else {
		return false;
	}
}

function blanco(){
	document.getElementById('nombre').style.backgroundColor = '#FFF';
	document.getElementById('correo').style.backgroundColor = '#FFF';
	document.getElementById('asunto').style.backgroundColor = '#FFF';
	document.getElementById('mensaje').style.backgroundColor = '#FFF';
	document.getElementById('spanMotivo1').style.color='black';
	document.getElementById('spanMotivo2').style.color='black';
}

function validarForm(){

	blanco();

	var error = 0;

	var vacio = 0;

	var mensajeError = "";

	var nombre = document.getElementById('nombre').value;

	var correo = document.getElementById('correo').value;

	var asunto = document.getElementById('asunto').value;

	var mensaje = document.getElementById('mensaje').value;

	var chequeo1 = document.getElementById('motivo1').checked;

	var chequeo2 = document.getElementById('motivo2').checked;

	if (nombre == ''){
		mensajeError = "Todos los campos son obligatorios. <br/>";
		vacio = 1;
		error = 1;
		document.getElementById('nombre').style.backgroundColor = 'pink';
	}

	if (correo == ''){
		if (vacio == 0){
			mensajeError = "Todos los campos son obligatorios. <br/>";
			vacio = 1;
			error = 1;
		}
		document.getElementById('correo').style.backgroundColor = 'pink';
	}else{
		validacion = validarEmail(correo);
		if(validacion == false){
			mensajeError = mensajeError + "El formato de correo es incorrecto <br/>";
			error = 1;
			document.getElementById('correo').style.backgroundColor = 'pink';
		}
	}

	if (asunto == ''){
		if (vacio == 0){
			mensajeError = mensajeError +  "Todos los campos son obligatorios. <br/>";
			vacio = 1;
			error = 1;
		}
		document.getElementById('asunto').style.backgroundColor = 'pink';
	}

	if (mensaje == ''){
		if (vacio == 0){
			mensajeError = mensajeError +  "Todos los campos son obligatorios. <br/>";
			vacio = 1;
			error = 1;
		}
		document.getElementById('mensaje').style.backgroundColor = 'pink';
	}

	if (chequeo1 == false && chequeo2 == false){
		mensajeError = mensajeError +  "Debe seleccionar un motivo de contacto. <br/>";
		error = 1;
		document.getElementById('spanMotivo1').style.color='red';
		document.getElementById('spanMotivo2').style.color='red';
	}


	if(error ==1){

		mostrarError(mensajeError);
		return false;

	}else{
		enviarCorreo();
	}
}

function enviarCorreo(){

	var nombre = document.getElementById('nombre').value;

	var correo = document.getElementById('correo').value;

	var region = document.getElementById('region').value;

	var asunto = document.getElementById('asunto').value;

	var mensaje = document.getElementById('mensaje').value;

	var chequeo1 = document.getElementById('motivo1').checked;

	var chequeo2 = document.getElementById('mailing').checked;

	var motivo;

	var mailing;

	if(chequeo1 ==  true){

		motivo = 'trabajo';
	}else{
		motivo = 'otro';
	}

	if(chequeo2 ==  true){

		mailing = 'Si';
	}else{
		mailing = 'No';
	}

	$.post("asp/enviarMail.asp",
		{ varNombre: nombre, varCorreo: correo, varRegion: region, varAsunto: asunto, varMensaje: mensaje, varMotivo: motivo, varMailing: mailing},
		function(data){
			mostrarError('¡Su mensaje ha sido enviado con éxito!');		  
		 }
	);

}

function  mostrarError(mensaje){
	document.getElementById('contenedorError').innerHTML=mensaje;

	$('#fondoContacto').fadeIn('fast');

	$('#popUpContacto').fadeIn(500);

}

function ocultarError(){

	$('#fondoContacto').fadeOut('slow');

	$('#popUpContacto').fadeOut('fast', function(){
		document.getElementById('contenedorError').innerHTML='';
	});

}