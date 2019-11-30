const functions = require('firebase-functions')
const { initializeFirebaseAdmin } = require('./databaseAccess')
const server = require('./server')

initializeFirebaseAdmin()

exports.api = functions
  .runWith({ memory: '128MB', timeoutSeconds: 3 })
  .https.onRequest(server)
