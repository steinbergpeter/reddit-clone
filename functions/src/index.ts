import { auth } from 'firebase-functions'
import { initializeApp, firestore } from 'firebase-admin'

initializeApp()
const db = firestore()

export const createUserDocument = auth.user().onCreate(async (user) => {
  db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)))
})
