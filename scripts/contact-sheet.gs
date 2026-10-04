/**
 * MLRIT CIE — contact form → Google Sheet (Google Apps Script)
 *
 * The website's /api/contact route POSTs each contact-form message here, and this
 * script appends it as a row in the Google Sheet the script is attached to.
 *
 * Setup (one time):
 *   1. Create a Google Sheet (e.g. "CIE Contact Messages").
 *   2. In the sheet: Extensions → Apps Script. Delete the sample code, paste this whole file.
 *   3. Set SECRET below to a long random string; put the same value in the
 *      site's CONTACT_WEBAPP_SECRET env var.
 *   4. Deploy → New deployment → type "Web app".
 *        Execute as: Me      Who has access: Anyone
 *      Authorize when asked (it needs permission to edit your sheet).
 *   5. Copy the Web app URL (ends in /exec) into CONTACT_WEBAPP_URL.
 *   After editing this script later: Deploy → Manage deployments → edit → Version: New.
 */

const SECRET = "CHANGE-ME-to-a-long-random-string";
const HEADERS = ["Sent", "Name", "Email", "Subject", "Message"];

function doPost(e) {
  let d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ error: "Invalid body" });
  }
  if (d.secret !== SECRET) return json({ error: "Unauthorized" });

  const name = String(d.name || "").slice(0, 100);
  const email = String(d.email || "").slice(0, 200);
  const subject = String(d.subject || "").slice(0, 150);
  const message = String(d.message || "").slice(0, 5000);
  const sentAt = d.sentAt ? new Date(d.sentAt) : new Date();

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([sentAt, name, email, subject, message].map(cell));
  } catch (err) {
    return json({ error: "Sheet write failed: " + err });
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// Stop "=..." input from running as a formula in the sheet.
function cell(v) {
  return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
