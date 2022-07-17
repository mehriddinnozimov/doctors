<template>
	<div class="has-text-centered">
		<figure>
			<img src="../assets/favicon.png" width="300" height="150">
		</figure>
	</div>
	<div class="mt-3 h-60">
		<div class="has-text-centered mt-5" v-if="step == 0">
			<div>
				<h1 class="title is-1">Tilni tanlash:</h1>
			</div>
			<div class="mt-3 w-300 center">
				<button class="button is-large is-info is-fullwidth mb-3 p-100" @click="selectLanguage('uz')"><p class="title is-3 has-text-white">O`zbek tili</p></button>
				<button class="button is-large is-info is-fullwidth my-3 p-100" @click="selectLanguage('ru')"><p class="title is-3 has-text-white">Русский язык</p></button>
				<button class="button is-large is-info is-fullwidth mt-3 p-100" @click="selectLanguage('en')"><p class="title is-3 has-text-white">English</p></button>
			</div>
		</div>
		<div v-if="step == 1">
			<div class="mt-3 w-300 center">
				<button class="button is-large is-success is-fullwidth mb-3" @click="rating">Shifokorlar</button>
				<button class="button is-large is-success is-fullwidth mt-3">Klinika bo`limi</button>
			</div>
		</div>		
	</div>

</template>

<script>
import AccordionVue from '../components/Accordion'
export default {
	methods: {
		selectLanguage(lang){
			this.$store.dispatch("language/selected", { lang: lang, onSuccess: () => this.step++ })
		},
		rating(){
			this.$store.dispatch("doctors/updateRating", {doctor:null, rating:null, onSuccess: () => {}})
		}
	},
	data(){ return {
		step: 0
	} },
	components: {
		AccordionVue
	}
}
</script>


<style scoped>
.w-300 {
	width: 500px;
}
.p-100 {
	padding: 50px;
}
.center {
	margin-right: auto;
	margin-left: auto;
}
</style>