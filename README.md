<link href="src/assets/css/markdown.css" rel="stylesheet"></link>

# FORMULARIO PARA EL PODER JUDICIAL

<!-- ![IMAGES DE GO LANG](images/ladder.svg) -->
<img src="src/assets/images/logo-poder-judicial.png" alt="Imagen go" width="200" />

<font size="5" face="Qwitcher Grypen">
Aplicación para generar la incidencias con caputas de pantalla.
</font>

## Iniciar

Esta proyecto esta echo en react js con tailwind css.

Algunos recursos para iniciar con este proyecto puedes ver en:

- [Node Js](https://nodejs.org/es/) Entorno de desarrollo para aplicación web o movil usando JavaScript.
- [React Js](https://reactjs.org/) Biblioteca para diseñar interfeces de usuario usando JavaScript.
- [Visual Studio](https://code.visualstudio.com/) Editor de código para todos tipos de lenguaje de programación.
- [Tailwindcss](https://tailwindcss.com/) Framework css para la parte visual.
- [TypeScript](https://www.typescriptlang.org/) Lenguaje de programación de tipado fuerte.
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) Lenguaje de programación interpretado.
- [Git](https://git-scm.com/) Software de control de versiones.
- [Git Hub](https://github.com/) Plataforma de alojamiento de proyecto de todo ámbito.

## Instalación

Siga los pasos para iniciar el desarrollo:

1. Clona el proyecto o agrague el ssh al repositorio para contribuir en nuevos cambios [Git Hub - Formulario](https://github.com/luissince/poder-judicial-frontend)

    1.1. Agregue por ssh para la integración

    #Code

        /** 
        ** Para el proceso de integración **
        **/

        // ejecute en su consola cmd, bash, git los siguientes comandos
        
        // Generar tu clave ssh para poder contribuir al proyecto
        ssh-keygen -t rsa -b 4096 -C "tu email"

        // Configuración global del nombre
        git config --global user.name "John Doe"

        // Configuración global del email
        git config --global user.email johndoe@example.com

        // crea una carpeta
        mkdir poder-judicial-frontend

        // moverse a la carpeta
        cd poder-judicial-frontend
        
        // comando que inicia git
        git init

        // comando que agrega la referencia de la rama
        git remote add origin git@github.com:luissince/poder-judicial-frontend.git
    
        // comando que descarga los archivos al working directory
        git fetch origin master
        
        // comando que une los cambios al staging area
        git merge origin/master

    2.2 Clonar

        #code

        /** 
        ** Para el proceso de clonación **
        **/

        // Clonar al proyecto
        git clone https://github.com/luissince/poder-judicial-frontend.git

2. Instale typescript si su proyecto lo usa

    #Code

        npm install -g typescript

3. Ejecute en la carpte la clonada **npm install** para descargar las dependencias del proyecto

    #Code

        npm install

4. Copiar el arhivo de la ruta del EndPoint

    #code

        //copie el archivo .env.example a .env 
        cp .env.example .env

5. Agregue el EndPoint el archivo .env 

    #code

        //Agregue la url del servidor
        VITE_URL_AP = "http://localhost"

6. Ejecute **npm run dev** para iniciar el modo desarrollo    

    #Code

        npm run dev

7. Ejecute **npm run build** para construir el proyecto

    #Code

        npm run build

8. Ejecute **npm run preview** para darle una preview del proyecto

    #Code

        npm run preview