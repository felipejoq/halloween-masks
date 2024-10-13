# Halloween Masks - ¿Qué tal te queda una de terror?

Proyecto para la "Hackathon Halloween" organizada por Midudev y Cloudinary. La consigna del proyecto es usar los servicios de Cloudinary para generar una aplicación con temática "Halloween 🎃".

> 🚀 Demo: [Halloween Masks](https://halloween.uncodigo.com/)

ℹ️ Proyecto Backend [Repositorio](https://github.com/felipejoq/halloween-mask-cloudinary)

La aplicación permite subir una imagen y probarse una máscara de terror. ¿Quién da más miedo, mi código o las máscaras? 😂

## Tecnologías utilizadas

- Astro 4.16.0
- Axios

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Crear un archivo `.env` en la raíz del proyecto con las variables de entorno. Tomar como ejemplo el archivo `.env.template`

```dotenv
# URL base de la API desplegada sin slash al final
BASE_URL=url-base-de-la-api-desplegada-sin-slash-al-final
# Este token se obtiene al hacer /login en el servidor backend, dura 1 año.
TOKEN_SECRET=token-obtenido-luego-de-hacer-login-en-la-api
```

## Servicios que incluye

- Página de inicio: muestra un formulario para subir una imagen.
- Página de resultados: muestra la imagen subida y las imágenes resultantes con máscara desde cloudinary.
- Página de error 500 o 400: muestra un mensaje de error si algo falla respectivamente.
- Página de about: muestra información sobre el proyecto.

## Para desplegar en desarrollo

- Ejecutar `npm run dev` (o cualquier otro gestor) para iniciar el servidor en modo desarrollo.
- Abrir localhost:4321 en el navegador o en su defecto la url que indica en la consola.

## Para desplegar en producción
- Recuerde añadir el adaptador indicado, en este caso está usando netlify, pero usted puede cambiarlo por el de su preferencia.


## About me
- [Felipe](https://uncodigo.com/)