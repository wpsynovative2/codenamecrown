/**
 * Codename Crown — lead capture endpoint.
 *
 * Deployed as a Google Apps Script Web App, this is the only server-side piece
 * in the stack: the Next.js site posts JSON here and this script appends a row
 * to the bound Google Sheet.
 *
 * SETUP
 * -----
 * 1. Open your Google Sheet → Extensions → Apps Script.
 * 2. Replace Code.gs with this file.
 * 3. Project Settings → Script properties, add:
 *      RECAPTCHA_SECRET  = your reCAPTCHA v3 SECRET key
 *      NOTIFY_EMAIL      = (optional) address to email on each new lead
 *      MIN_SCORE         = (optional) reCAPTCHA threshold, defaults to 0.5
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as:        Me
 *      Who has access:    Anyone
 * 5. Copy the /exec URL into the site's .env.local as NEXT_PUBLIC_SHEET_ENDPOINT.
 *
 * Re-deploy (Deploy → Manage deployments → edit → New version) after any edit,
 * otherwise the old code keeps serving.
 */

var SHEET_NAME = 'Leads';

var HEADERS = [
  'Timestamp (server)',
  'Submitted At (client)',
  'Full Name',
  'Contact No',
  'Email',
  'Interested In',
  'Message',
  'Consent',
  'Source',
  'Page URL',
  'reCAPTCHA Score',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Empty request.' });
    }

    var data = JSON.parse(e.postData.contents);

    // --- Honeypot -------------------------------------------------------
    // A real visitor never sees this field. Anything in it is a bot: report
    // success so the bot moves on, but store nothing.
    if (data.website && String(data.website).trim() !== '') {
      return jsonResponse({ ok: true, skipped: 'honeypot' });
    }

    // --- Server-side validation ----------------------------------------
    var name = String(data.name || '').trim();
    var phone = String(data.phone || '').replace(/\D/g, '');

    if (name.length < 2) {
      return jsonResponse({ ok: false, error: 'Please enter your full name.' });
    }

    // Accept 10-digit Indian mobiles, tolerating a 91 country prefix.
    if (phone.length === 12 && phone.indexOf('91') === 0) phone = phone.slice(2);
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return jsonResponse({
        ok: false,
        error: 'Please enter a valid 10-digit Indian mobile number.',
      });
    }

    var email = String(data.email || '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return jsonResponse({ ok: false, error: 'Please enter a valid email address.' });
    }

    // --- reCAPTCHA v3 ---------------------------------------------------
    var score = verifyRecaptcha(data.recaptchaToken);
    if (score.rejected) {
      return jsonResponse({ ok: false, error: score.error });
    }

    // --- Append ---------------------------------------------------------
    var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      String(data.submittedAt || ''),
      name,
      "'" + phone, // leading quote keeps Sheets from mangling it into a number
      email,
      String(data.interestedIn || ''),
      String(data.message || '').slice(0, 1000),
      String(data.consent || ''),
      String(data.source || ''),
      String(data.pageUrl || ''),
      score.value,
    ]);

    notify(name, phone, email, data);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: 'Server error: ' + err.message });
  }
}

/** Lets you sanity-check the deployment in a browser. */
function doGet() {
  return jsonResponse({ ok: true, status: 'Codename Crown lead endpoint is live.' });
}

/* -------------------------------------------------------------- helpers -- */

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Returns { rejected: boolean, value: string|number, error?: string }.
 * With no secret configured the check is skipped so the form still works
 * during development.
 */
function verifyRecaptcha(token) {
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('RECAPTCHA_SECRET');

  if (!secret) {
    return { rejected: false, value: 'not-configured' };
  }

  if (!token) {
    return { rejected: true, value: 0, error: 'Captcha missing. Please retry.' };
  }

  var minScore = Number(props.getProperty('MIN_SCORE') || 0.5);

  var response = UrlFetchApp.fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'post',
      payload: { secret: secret, response: token },
      muteHttpExceptions: true,
    }
  );

  var result = JSON.parse(response.getContentText());

  if (!result.success) {
    return {
      rejected: true,
      value: 0,
      error: 'Captcha verification failed. Please refresh and try again.',
    };
  }

  if (typeof result.score === 'number' && result.score < minScore) {
    return {
      rejected: true,
      value: result.score,
      error: 'Your submission looked automated. Please try again.',
    };
  }

  return { rejected: false, value: result.score };
}

function notify(name, phone, email, data) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;

  try {
    MailApp.sendEmail({
      to: to,
      subject: 'New Codename Crown enquiry — ' + name,
      body: [
        'Name: ' + name,
        'Phone: +91 ' + phone,
        'Email: ' + (email || '—'),
        'Interested In: ' + (data.interestedIn || '—'),
        'Message: ' + (data.message || '—'),
        'Source: ' + (data.source || '—'),
        'Page: ' + (data.pageUrl || '—'),
        'Submitted: ' + (data.submittedAt || '—'),
      ].join('\n'),
    });
  } catch (err) {
    // Never let a mail failure lose the lead — the row is already written.
    console.error('Notification email failed: ' + err.message);
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
