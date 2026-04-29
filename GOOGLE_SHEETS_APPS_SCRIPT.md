# Google Sheets Apps Script Setup

Use this script in your Google Sheet so `service-package-detail.html` can save form submissions directly to a sheet.

## 1) Open Apps Script from Google Sheets

1. Open your Google Sheet.
2. Go to `Extensions -> Apps Script`.
3. Replace the default code with the script below.

## 2) Paste this Apps Script code

```javascript
function doPost(e) {
  try {
    var sheetName = 'PackageRequests';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Package ID',
        'Name',
        'Email',
        'Phone',
        'Description',
        'Page URL',
        'Submitted At (Client)'
      ]);
    }

    var params = e && e.parameter ? e.parameter : {};

    sheet.appendRow([
      new Date(),
      params.packageId || '',
      params.name || '',
      params.email || '',
      params.phone || '',
      params.description || '',
      params.pageUrl || '',
      params.submittedAt || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3) Deploy as Web App

1. Click `Deploy -> New deployment`.
2. Select type: `Web app`.
3. Set:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click `Deploy` and copy the **Web app URL**.

## 4) Add URL in your website code

In `js/service-package-detail.js`, set:

```javascript
var GOOGLE_SHEETS_WEB_APP_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

Then replace it with the deployed URL from step 3.

## 5) Re-deploy on future script changes

If you edit the Apps Script later, deploy a new version and keep the web app URL updated in your site if it changes.
