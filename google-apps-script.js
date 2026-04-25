// ============================================================
// Helix-Zain — Google Sheets Form Handler
// ============================================================
// HOW TO DEPLOY:
// 1. Open your Google Sheet
// 2. Click Extensions → Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Click Save (floppy disk icon)
// 5. Click Deploy → New deployment
// 6. Click the gear icon next to "Type" and choose "Web app"
// 7. Set "Execute as" → Me
//    Set "Who has access" → Anyone
// 8. Click Deploy → Authorize access → Allow
// 9. Copy the Web app URL shown — it looks like:
//    https://script.google.com/macros/s/XXXXXXXX/exec
// 10. Paste that URL into js/script.js where it says GOOGLE_SHEETS_URL
// ============================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let sheet;
    let row;

    if (data.formType === 'contact') {
      sheet = ss.getSheetByName('Contact Form');
      if (!sheet) {
        sheet = ss.insertSheet('Contact Form');
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Business Name', 'Service Needed', 'Phone', 'Message']);
        sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#0A1A2F').setFontColor('#FFFFFF');
        sheet.setFrozenRows(1);
      }

      row = [
        new Date(),
        data.name,
        data.email,
        data.businessName,
        data.serviceNeeded,
        data.phone || 'Not provided',
        data.message
      ];

    } else if (data.formType === 'start-project') {
      sheet = ss.getSheetByName('Project Requests');
      if (!sheet) {
        sheet = ss.insertSheet('Project Requests');
        sheet.appendRow([
          'Timestamp', 'Client Name', 'Client Email', 'Client Phone', 'Company',
          'Project Type', 'Goals', 'Budget', 'Timeline',
          'Project Name', 'Project Description', 'Meeting Preference'
        ]);
        sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#0A1A2F').setFontColor('#FFFFFF');
        sheet.setFrozenRows(1);
      }

      row = [
        new Date(),
        data.clientName,
        data.clientEmail,
        data.clientPhone,
        data.clientCompany || 'Not provided',
        data.projectType,
        data.goals,
        data.budget,
        data.timeline,
        data.projectName,
        data.projectDescription,
        data.meetingPreference || 'Not specified'
      ];

    } else if (data.formType === 'web-development') {
      sheet = ss.getSheetByName('Web Dev Consultations');
      if (!sheet) {
        sheet = ss.insertSheet('Web Dev Consultations');
        sheet.appendRow([
          'Timestamp', 'Full Name', 'Email', 'Company', 'Project Description',
          'Website Type', 'CMS Preference', 'Pages Estimate', 'Timeline',
          'Priorities', 'Budget', 'Consultation Date', 'Time Slot'
        ]);
        sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#0A1A2F').setFontColor('#FFFFFF');
        sheet.setFrozenRows(1);
      }

      row = [
        new Date(),
        data.fullName, data.email, data.company || 'Not provided', data.projectDescription,
        data.websiteType, data.cmsPreference || 'Not specified', data.pagesEstimate || 'Not specified',
        data.timeline || 'Not specified', data.priorities,
        data.budget, data.consultationDate, data.timeSlot
      ];

    } else if (data.formType === 'app-development') {
      sheet = ss.getSheetByName('App Dev Consultations');
      if (!sheet) {
        sheet = ss.insertSheet('App Dev Consultations');
        sheet.appendRow([
          'Timestamp', 'Full Name', 'Email', 'Company', 'Project Description',
          'App Type', 'App Stage', 'Target Platforms', 'Timeline',
          'Budget', 'Consultation Date', 'Time Slot'
        ]);
        sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#0A1A2F').setFontColor('#FFFFFF');
        sheet.setFrozenRows(1);
      }

      row = [
        new Date(),
        data.fullName, data.email, data.company || 'Not provided', data.projectDescription,
        data.appType, data.appStage, data.platforms,
        data.timeline || 'Not specified',
        data.budget, data.consultationDate, data.timeSlot
      ];

    } else if (data.formType === 'automation-ai') {
      sheet = ss.getSheetByName('Automation & AI Consultations');
      if (!sheet) {
        sheet = ss.insertSheet('Automation & AI Consultations');
        sheet.appendRow([
          'Timestamp', 'Full Name', 'Email', 'Company', 'Project Description',
          'Automation Goals', 'Existing Tools', 'AI Usage Level', 'Data Sensitivity',
          'Budget', 'Consultation Date', 'Time Slot'
        ]);
        sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#0A1A2F').setFontColor('#FFFFFF');
        sheet.setFrozenRows(1);
      }

      row = [
        new Date(),
        data.fullName, data.email, data.company || 'Not provided', data.projectDescription,
        data.automationGoals, data.existingTools || 'Not provided',
        data.aiUsageLevel || 'Not specified', data.dataSensitivity || 'Not specified',
        data.budget, data.consultationDate, data.timeSlot
      ];

    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Unknown form type' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test this function manually in the Apps Script editor
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Connected to: ' + ss.getName());
}
