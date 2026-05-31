# Juan — Birthday Experience

Mini invitación interactiva editorial inspirada en una atmósfera Euphoria: azul, violeta, negro y plateado.

## Archivos

- `index.html`: estructura de la invitación.
- `styles.css`: estética visual y animaciones.
- `script.js`: cuenta regresiva, música, formularios y conexión con Google Sheets.
- `apps-script.gs`: código para pegar en Google Apps Script.

## Música

Por copyright, el archivo de audio no viene incluido. Para que suene al presionar "Enter":

1. Crea una carpeta `assets` junto a estos archivos.
2. Agrega el archivo de audio legalmente obtenido con este nombre:
   `still-dont-know-my-name.mp3`
3. O cambia la ruta dentro de `index.html`.

## Google Sheets

1. Crea un Google Sheet.
2. Crea 3 hojas:
   - Invitados
   - Playlist
   - Recuerdos
3. En el Sheet ve a `Extensions > Apps Script`.
4. Pega el contenido de `apps-script.gs`.
5. Publica como Web App:
   - Ejecutar como: Me
   - Acceso: Anyone
6. Copia la URL de la Web App.
7. Pégala en `script.js`:

```js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/library/d/1jTGtW4JSHMMZ863dm1pIU_uprFOvxDV9jhzeYmwQi2f1bGLq8zq_78gd/1";
```

## Publicar gratis

Puedes subir esta carpeta a Vercel, Netlify o GitHub Pages.
