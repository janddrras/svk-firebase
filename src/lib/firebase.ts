import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from './config'
import { writable } from 'svelte/store'

// Your web app's Firebase configuration
// Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

/**
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser')
		const { subscribe } = writable<User | null>(null)
		return {
			subscribe
		}
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user)
		})

		return () => unsubscribe()
	})

	return {
		subscribe
	}
}

export const user = userStore()
