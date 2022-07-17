import db from '../../db'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
	namespaced: true,
	state(){ return {
		data: null
	} },
	actions: {
		onAuthChange(_, cb) {
			onAuthStateChanged(getAuth(), async (user) => {
				if(user) {
					_.commit("setData",{
						email: user.email
					})
					cb(user)
				} else {
					console.log("not loggin")
					cb(null)
				}
			})
		},
		async login(_, {form, onSuccess}) {
			try {
				await signInWithEmailAndPassword(getAuth(), form.email, form.password)
				onSuccess()
			} catch (err) {
				_.dispatch("toast/error", err.message, {root:true})
			}
		},
		async logout(_, { onSuccess }){
			try {
				signOut(getAuth())
				_.commit("setData", null)
				_.dispatch("toast/success", "You are logged out!", {root:true})
				onSuccess()
			} catch (err) {
				_.dispatch("toast/error", err.message, {root:true})
			}
		},		
	},
	mutations: {
		setData(state, data){
			state.data = data
		}
	}
}