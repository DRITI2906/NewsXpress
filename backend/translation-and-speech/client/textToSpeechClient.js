const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
require('dotenv').config();

// Clear stale credentials path if file doesn't exist
if (process.env.GOOGLE_APPLICATION_CREDENTIALS && !fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
  delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
}

const apiKey = process.env.GOOGLE_API_KEY;
const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let ttsClient;
try {
  if (filePath) {
    ttsClient = new textToSpeech.TextToSpeechClient({ keyFilename: filePath });
  } else if (apiKey) {
    ttsClient = new textToSpeech.TextToSpeechClient({ apiKey });
  } else {
    console.warn('⚠️  No Google Cloud credentials — TTS will be disabled.');
    ttsClient = null;
  }
} catch (err) {
  console.warn('⚠️  Failed to init TTS client:', err.message);
  ttsClient = null;
}

module.exports = ttsClient