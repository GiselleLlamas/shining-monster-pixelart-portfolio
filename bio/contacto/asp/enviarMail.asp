<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%

Dim nombre, correo, region, asunto, mensaje, motivo, myMail


nombre = Request.Form("varNombre")
correo = Request.Form("varCorreo")
region = Request.Form("varRegion")
asunto = Request.Form("varAsunto")
mensaje = Request.Form("varMensaje")
motivo = Request.Form("varMotivo")
mailing = Request.Form("varMailing")

'///////////////////

Set myMail=CreateObject("CDO.Message")
myMail.Subject = asunto
myMail.From = "contacto@gisellellamas.com"
myMail.To = "giselle.llamas@gmail.com"
myMail.HTMLBody = "Nuevo correo enviado desde el sitio de Giselle Llamas.<br />"
myMail.HTMLBody = myMail.HTMLBody & "Los datos del mismo son: <br /><br />"
myMail.HTMLBody = myMail.HTMLBody & "Nombre: " & nombre & "<br/>"
myMail.HTMLBody = myMail.HTMLBody & "Email: " & correo & "<br/>"
myMail.HTMLBody = myMail.HTMLBody & "Region: " & region & "<br/>"
myMail.HTMLBody = myMail.HTMLBody & "Asunto: " & asunto & "<br/>"
myMail.HTMLBody = myMail.HTMLBody & "Motivo: " & motivo & "<br/>"
myMail.HTMLBody = myMail.HTMLBody & "Mensaje: <br/>"
myMail.HTMLBody = myMail.HTMLBody &  mensaje & "<br/>"
myMail.HTMLBody = myMail.HTMLBody & "Se ha suscripto al newsletter: " & mailing & "<br/>"
myMail.Send
set myMail=nothing

'Response.Write("gmail y contacto")
Response.Write("ok")
%>