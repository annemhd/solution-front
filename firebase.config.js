// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

// const db = getFirestore()

const firebaseConfig = {
    apiKey: 'AIzaSyApWZJ37QQV9gVaItSf9naPJn69xD4q4gY',
    authDomain: 'solution-cloud-dd932.firebaseapp.com',
    projectId: 'solution-cloud-dd932',
    storageBucket: 'solution-cloud-dd932.appspot.com',
    messagingSenderId: '853369724688',
    appId: '1:853369724688:web:9d91167080eb4ab73b8f95',
    measurementId: 'G-K90MCXX2MD',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)

const forgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        console.log('Password reset email sent successfully.')
    } catch (error) {
        console.error('Error sending password reset email:', error.message)
    }
}

// Create a root reference
const storage = getStorage(app)

export { app, auth, storage, forgotPassword }
