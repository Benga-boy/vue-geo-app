
// ? FIREBASE FUNCTIONS TO HANDLE CHECK IF ALIAS ALREADY EXISTS!!

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// eslint-disable-next-line no-unused-vars
exports.checkAlias = functions.https.onCall((data, context) => {

  const ref = admin.firestore().collection('users').doc(data.slug)
  return ref.get().then(doc => {
    return {
      unique: !doc.exists
    }
  // eslint-disable-next-line no-unused-vars
  }).catch(err => {
    throw new functions.https.HttpsError('Failed to connect')
  })
})
