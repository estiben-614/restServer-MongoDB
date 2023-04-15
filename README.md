#Webserver + RestServer + MongoDB +JWT

Bievenidos a mi RestServer usando ES5 (CommonJs)

Para ejecutar, primero instalar las dependencias de node usando npm install 

Luego, realice peticiones a la siguiente URL http://localhost:8080

Para crear un usuario, use una petición POST de la siguiente manera :  {"nombre":"test1",  "google":true, "nuevoCampo":true, "correo":"test1@gmail.com", "password":"123456", "role":"ADMIN_ROLE"}

Para ver todos los usuarios ingresados, use las peticiones GET y que tienen los siguientes QUERY opcionales http://localhost:8080?desde=' '&limite= '   ' 

Para modificar y eliminar un usuario a partir de su ID, use las peticiones PUT y DELETE ingresando el parametro del ID http://localhost:8080/<'type-userID-here>

Para hacer un login ingresar a http://localhost:8000/api/auth/login y realice una petición con un usuario en su BD. Se realizaran las correspondientes validaciones, y si es un usuario registrado