import { createStore } from 'vuex'
import language from './modules/language'
import profile from './modules/profile'
import doctors from './modules/doctors'
import toast from './modules/toast'

export default createStore({
  modules: {
    language,
    profile,
    doctors,
    toast
  }
})
