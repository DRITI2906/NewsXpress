require('dotenv').config()
const fs = require('fs')
const { Translate } = require('@google-cloud/translate').v2

// Clear stale credentials path if file doesn't exist
if (process.env.GOOGLE_APPLICATION_CREDENTIALS && !fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
}

// Use API key if no service account file is available
const apiKey = process.env.GOOGLE_API_KEY;
const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let translateClient;
try {
    if (apiKey) {
        translateClient = new Translate({ key: apiKey });
    } else if (filePath) {
        translateClient = new Translate({ keyFilename: filePath });
    } else {
        console.warn('⚠️  No Google Cloud credentials — translation will be disabled.');
        translateClient = null;
    }
} catch (err) {
    console.warn('⚠️  Failed to init Translation client:', err.message);
    translateClient = null;
}

module.exports = translateClient