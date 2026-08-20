/**
 * Recibe una visita del sitio "Recursos Legales · PULPPO" y la guarda como
 * una fila en la hoja "Visitas" de este spreadsheet.
 *
 * Instalación:
 *   1. Abre tu Google Sheet → Extensiones → Apps Script.
 *   2. Borra el contenido de Code.gs y pega TODO este archivo.
 *   3. Guarda (⌘S / Ctrl+S).
 *   4. Implementar → Nueva implementación → tipo "Aplicación web".
 *        - Ejecutar como: Yo (tu cuenta)
 *        - Quién tiene acceso: Cualquier usuario
 *   5. Autoriza los permisos que pida Google (es tu propio script).
 *   6. Copia la URL de la aplicación web que te da al implementar.
 *   7. Pégala en `analytics.js` del sitio, en la constante ENDPOINT.
 */

function doGet(e) {
  return handleHit(e);
}

function doPost(e) {
  return handleHit(e);
}

function handleHit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Visitas');
  if (!sheet) {
    sheet = ss.insertSheet('Visitas');
    sheet.appendRow(['Fecha y hora', 'Página', 'Referrer', 'Dispositivo (user agent)', 'Idioma']);
    sheet.setFrozenRows(1);
  }

  var p = (e && e.parameter) || {};
  sheet.appendRow([
    new Date(),
    p.page || '',
    p.ref || '',
    p.ua || '',
    p.lang || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
