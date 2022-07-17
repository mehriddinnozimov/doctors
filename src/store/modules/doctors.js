import db from '../../db'
import { collection, getDocs, getDoc, doc, addDoc,where, query, Timestamp, limit, startAfter, startAt, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

export default {
	namespaced: true,
	state(){ return {
		array: []
	}},
	actions: {
		async getDoctors({ commit, dispatch, state }) {
			try {
				const queryData = query(collection(db, "doctors"))
	      const snapshot = await getDocs(queryData)
	      const doctors = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }))
	      commit("setArray", doctors)
			} catch (err) {
				dispatch("toast/error", err.message, {root:true})
			}
		},
		async create(_, { form, onSuccess }){
			try {
				form.createdAt = Timestamp.fromDate(new Date())
				form.rating = []
				await addDoc(collection(db, "doctors"), form)
				_.dispatch("toast/success", "Doctor was created", { root: true })
				_.dispatch("getDoctors")
				onSuccess()
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}
		},
		async update(_, { form, onSuccess }){
			try {
				const docRef = doc(db, "doctors", form.id)
				delete form.skill
				delete form.courtesy
				delete form.voted
				await updateDoc(docRef, form)
				_.dispatch("toast/success", "Doctor updated", { root: true })
				await _.dispatch("getDoctors")
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}
		},
		async remove(_, { id, onSuccess }){
			try {
				const docRef = doc(db, "doctors", id)
				await deleteDoc(docRef)
				_.dispatch("toast/success", "Doctor removed", { root: true })
				await _.dispatch("getDoctors")
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}
		},
		async uploadImage(_, {file, onSuccess}){
			try {
				const tag = file.name.split(".").pop()
				if(!["png", "jpeg", "jpg"].includes(tag)) {
					_.dispatch("toast/error", 'Unallowed tag. "jpg", "jpeg" or "png" are allowed', { root: true })
					return
				}
				if((file.size / 1024 / 1024) > 2){
					_.dispatch("toast/error", "File size should not exceed 2 mb", { root: true })
				}
				const storage = getStorage()
				const storageRef = ref(storage, 'images/'+file.name)
				const uploadResult = await uploadBytes(storageRef, file.bytes)
				const downloadUrl = await getDownloadURL(uploadResult.ref) 
				onSuccess(downloadUrl)
				_.dispatch("toast/success", "Image uploaded", { root: true })
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}
		},
		async updateRating(_, { doctor, rating, onSuccess }){
			try {
				doctor = {
					firstName: "Mehriddin",
					lastName: "Nozimov"
				}
				rating = {
					skill: 4,
					courtesy: 5
				}
				const bot = {
					token : "5589861482:AAHYxGR7RVIeV88Daxoub_IYQU7HLrUaS7s",
					channelId: "@channeltestvuebot",
					text: `Baholandi:%0A<strong>${doctor.firstName} ${doctor.lastName}</strong>%0AMuomila - <strong>${rating.courtesy}</strong>%0AMalaka - <strong>${rating.skill}</strong>`
				}
				const res = await axios.get(`https://api.telegram.org/bot${bot.token}/sendMessage?chat_id=${bot.channelId}&text=${bot.text}&parse_mode=HTML`)
				console.log(res.data)
				if(!res.data.ok) throw new Error("Something wrong!")
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}

		}
	},

	mutations: {
		setArray(state, doctors){
			state.array = doctors
		}
	},
	getters: {
		getDoctorsTable(state){
      const table = {}
      table.heads = [
      	{value: 'Rasmi', key: 'avatar'},
      	{value:"Ismi", key: 'firstName'}, 
      	{value:"Familiyasi", key:"lastName"}, 
      	{value:"Kasbi", key: "job"}, 
      	{value: 'Qavat', key:'stage'},
      	{value: 'Xona', key: 'room'},
      	{value: 'Malaka', key: 'skill'},
      	{value: 'Muomila', key: 'courtesy'},
      	{value: 'Soni', key: 'voted' }
      ]
      table.body = []
      for(let i = 0; i < state.array.length; i++){
      	const doctor = state.array[i]
      	const voted = doctor.rating.length
      	let skill = 0
      	let courtesy = 0
      	if(voted > 0){
	      	doctor.rating.forEach(n => {
	      		skill = skill + n.skill
	      		courtesy = courtesy + n.courtesy
	      	})
	      	skill = (skill / voted).toString().substr(0, 3)
	      	courtesy = (courtesy / voted).toString().substr(0, 3) 		
      	}
        const obj = {}
        obj.id = doctor.id
        obj.firstName = doctor.firstName
        obj.lastName = doctor.lastName
        obj.job = doctor.job
        obj.stage = doctor.stage
        obj.skill = skill
        obj.courtesy = courtesy
        obj.voted = voted
        obj.avatar = doctor.avatar
        obj.room = doctor.room

        table.body.push(obj)          
      }
      return table
		}
	}
}