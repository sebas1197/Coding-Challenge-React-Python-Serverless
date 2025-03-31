# Reto de Codificación Posición: Fullstack Developer (React + Python Serverless)

- Imagina que estás construyendo un sistema de gestión de tareas para un equipo de desarrollo. La aplicación debe permitir a los usuarios crear, actualizar y eliminar tareas. Además, cada tarea debe tener un título, una descripción y un estado (por hacer, en progreso, completada).

## Pre-requisitos 📋

- Internet.
- Herramienta de peticiones HTTP.
- Python 3
- React v19.

## Ejecución 🛠️

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

- Clonar o descargar el repositorio.
- Abrir una terminal dentro de la carpeta del proyecto y ejecutar el siguiente comando (FRONTEND).

    ```bash
    npm i

    npm run dev
   ```

- Abrir una terminal dentro de la carpeta del proyecto y ejecutar el siguiente comando (BACKEND).

    ```bash
    python manage.py migrate

    pip install requirements.txt

    py manage.py runserver
   ```

## DOCKER🚀
- 

    docker build -t django-backend .

    docker run -p 8000:8000 django-backend

    docker build -t react-frontend .

    docker run -p 3000:3000 react-frontend



## Autor ✒️

* **Ing.Sebastián Landázuri G** 