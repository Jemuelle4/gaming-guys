import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC8TCe95x-u_kJj1BzIYLOoDCof9_jd4v0",
    authDomain: "gamingguys-276e9.firebaseapp.com",
    projectId: "gamingguys-276e9",
    storageBucket: "gamingguys-276e9.appspot.com",
    messagingSenderId: "1009592625243",
    appId: "1:1009592625243:web:db7859bcb1479a40fb377e"
  }

initializeApp(firebaseConfig)

const db = getFirestore()

const auth = getAuth()

const storage = getStorage()

export { db, auth, storage }

