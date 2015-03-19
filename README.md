README !

Para desplegar de manera exitosa esta aplicacion por favor siga los siguientes pasos:

1) Instale NodeJS en su sistema operativo. https://nodejs.org/download/

2) Instale MongoDB en su sistema operativo. https://www.mongodb.org/downloads

3) Asegurese de que el demonio de mongo esta corriendo.
    ejecute el comando 'mongo' si recibe un error debera ejecutar el demonio 'mongod'

4) Haga un restore de la BD
    ejecute el comando 'mongorestore' y pasele como parametro la ruta de la carpeta db-data

5) Dentro de la carpeta de la aplicacion ejecute 'npm install' para instalar las dependencias del proyecto.

6) Ejecute el comando 'DEBUG=displaceit:* ./bin/www'

7) Vaya a http://localhost:3000/
