# Recursos Legales · PULPPO

Sitio estático (HTML/CSS/JS plano, sin build ni backend) que consolida, por etapa del *journey* de una operación inmobiliaria, todos los formularios, contratos y enlaces que el equipo legal comparte con los asesores — para que no tengan que buscarlos entre chats, correos y la presentación original.

Contenido extraído de la presentación **"Journey de las Operaciones Inmobiliarias / Equipo Legal"** de PULPPO.

## Estructura

- `index.html` — contenido del sitio, organizado por rubro (F1–F7).
- `style.css` — estilos.
- `script.js` — buscador de recursos y navegación de pasos activa.
- `analytics.js` — medición de visitas hacia Google Sheets (ver abajo).
- `apps-script/Code.gs` — código del backend en Google Apps Script que recibe esas visitas.

## Ver el sitio en local

No requiere instalación. Desde esta carpeta:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000`.

## Publicarlo con GitHub Pages

1. Crea un repositorio en GitHub (público) y sube este contenido (ver instrucciones que te compartió Claude).
2. En el repo: **Settings → Pages → Source → Deploy from a branch**, elige la rama `main` y carpeta `/ (root)`.
3. En unos minutos el sitio queda disponible en `https://<tu-usuario>.github.io/<nombre-repo>/`.

## Actualizar contenido

Los recursos marcados como **"Enlace pendiente"** están así porque la presentación original no traía un link confirmado (o la tabla resumen del deck los marcaba como pendientes aunque la diapositiva de detalle mostrara uno). Para agregar un link:

1. Abre `index.html`.
2. Busca el bloque `<li class="resource pending">` correspondiente.
3. Cambia la clase a `resource available` y reemplaza el `<span class="resource-badge">Enlace pendiente</span>` por:
   ```html
   <a class="resource-link" href="URL_AQUI" target="_blank" rel="noopener">Abrir ↗</a>
   ```

## Medir visitas (Google Sheets)

Ya está creado el spreadsheet **["Visitas · Recursos Legales PULPPO"](https://docs.google.com/spreadsheets/d/1jodJTE8ziYvGXGw16AnO7jqhmPbImpXlBJFt2S695X8/edit)** en tu Drive. El sitio ya trae el código listo (`analytics.js` + `apps-script/Code.gs`) — solo falta conectarlos, una vez, ~5 minutos:

1. Abre el spreadsheet de arriba → **Extensiones → Apps Script**.
2. Borra lo que haya en `Code.gs` y pega todo el contenido de [`apps-script/Code.gs`](apps-script/Code.gs) de este repo.
3. Guarda (⌘S / Ctrl+S).
4. **Implementar → Nueva implementación** → tipo **"Aplicación web"**.
   - Ejecutar como: **Yo** (tu cuenta)
   - Quién tiene acceso: **Cualquier usuario**
5. Autoriza los permisos que pida Google (es tu propio script, sobre tu propia hoja).
6. Copia la **URL de la aplicación web** que te entrega al implementar.
7. Abre `analytics.js` en este repo, pega esa URL en la constante `ENDPOINT` (línea ~9), y sube el cambio.

Desde ese momento, cada visita al sitio agrega una fila a la hoja "Visitas" con fecha/hora, página vista, de dónde vino (referrer), dispositivo e idioma — sin que tengas que hacer nada más. Mientras `ENDPOINT` esté vacío, el script no manda ni guarda nada.

## Nota sobre inconsistencias detectadas en el deck original

- El formulario de **Captación** tenía dos links distintos entre la diapositiva de detalle y la tabla resumen; se usó el de la diapositiva de detalle (`forms.gle/FCPKH6GePMU7F7zTA`).
- **Contrato de Comisión Mercantil** y **Generador de oferta** tenían un link funcionando en su diapositiva de detalle, pero la tabla resumen los marcaba como "Enlace pendiente" — por decisión del equipo, se publicaron aquí como pendientes.
- **Carta Oferta de Compraventa** y **KYC PULPPO** no traían ningún link en la presentación (solo "Formato en Google Docs"), por lo que se muestran como pendientes.
