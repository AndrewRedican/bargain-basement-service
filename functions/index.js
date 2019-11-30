const { pubsub, https, config, database } = require('firebase-functions')
const { initializeFirebaseAdmin } = require('./databaseAccess')

initializeFirebaseAdmin()

exports.helloWorld = https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
