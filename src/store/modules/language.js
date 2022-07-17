const language = {
	uz: {
		nav: {
			logout: 'Chiqish',
			dashboard: 'Panel',
			login: 'Kirish'
		}
	},
	ru: {
		nav: {
			logout: 'Выход',
			dashboard: 'Панель'
		}
	},
	en: {
		nav: {
			logout: 'Logout',
			dashboard: 'Dashboard',
			login: 'Login'
		}
	}
}

export default {
	namespaced: true,
	actions: {
		selected(_, { lang, onSuccess }){
			_.commit("setLang", lang)
			onSuccess()
		}
	},
	mutations: {
		setLang(state, lang){
			state.data = language[lang]
		}
	},
	state(){ return {
		lang: "uz",
		data: language['uz']
	} }
}