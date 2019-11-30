const functions = require('firebase-functions')
const { initializeFirebaseAdmin } = require('./databaseAccess')
const server = require('./src/server')
const api = functions
  .runWith({ memory: '128MB', timeoutSeconds: 3 })
  .https.onRequest(server)

initializeFirebaseAdmin()

module.exports = { api }
