/**
 * Medición de visitas → Google Sheets.
 *
 * Cómo activarla (una sola vez, ~5 min): ver README.md → "Medir visitas".
 * Mientras ENDPOINT esté vacío, este script no hace nada — no rompe el sitio
 * ni manda datos a ningún lado.
 */
(function () {
  var ENDPOINT = ""; // ← pega aquí la URL de tu Google Apps Script Web App

  if (!ENDPOINT) return;
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;

  try {
    var params = new URLSearchParams({
      page: location.pathname + location.hash,
      ref: document.referrer || "(directo)",
      ua: navigator.userAgent,
      lang: navigator.language || ""
    });
    // Se manda como una imagen de 1x1: evita problemas de CORS y nunca
    // bloquea ni retrasa la carga del sitio.
    new Image().src = ENDPOINT + "?" + params.toString();
  } catch (err) {
    /* silencioso a propósito: la medición nunca debe romper la página */
  }
})();
