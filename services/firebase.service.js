import { sendPasswordResetEmail } from 'firebase/auth'

export class FirebaseService {
    async forgotPassword() {
        try {
            await sendPasswordResetEmail(auth, email.value)
            router.push({ path: '/signin' })
            success()
        } catch (error) {
            console.error('Le mail pour reinitialiser:', error.message)
        }
    }
}
