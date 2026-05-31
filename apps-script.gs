/*
Google Apps Script para guardar datos en Google Sheets.

Cómo usar:
1. Crea un Google Sheet nuevo.
2. Crea 3 hojas con estos nombres exactos:
   - Invitados
   - Playlist
   - Recuerdos
3. En Extensions > Apps Script, pega este código.
4. Deploy > New deployment > Web app.
5. Ejecutar como: Me.
6. Quién tiene acceso: Anyone.
7. Copia la URL del Web App y pégala en script.js en GOOGLE_SCRIPT_URL.
*/

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const now = new Date();

    if (payload.type === 'rsvp') {
      const sheet = ss.getSheetByName('Invitados') || ss.insertSheet('Invitados');
      ensureHeader_(sheet, ['Fecha', 'Nombre', 'Apellido', 'Teléfono', 'Asistencia', 'Mensaje']);
      sheet.appendRow([
        now,
        payload.data.firstName || '',
        payload.data.lastName || '',
        payload.data.phone || '',
        payload.data.attendance || '',
        payload.data.note || ''
      ]);
    }

    if (payload.type === 'playlist') {
      const sheet = ss.getSheetByName('Playlist') || ss.insertSheet('Playlist');
      ensureHeader_(sheet, ['Fecha', 'Nombre', 'Canción', 'Artista']);
      sheet.appendRow([
        now,
        payload.data.name || '',
        payload.data.song || '',
        payload.data.artist || ''
      ]);
    }

    if (payload.type === 'memory') {
      const sheet = ss.getSheetByName('Recuerdos') || ss.insertSheet('Recuerdos');
      ensureHeader_(sheet, ['Fecha', 'Nombre', 'Mensaje']);
      sheet.appendRow([
        now,
        payload.data.name || '',
        payload.data.message || ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeader_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}
