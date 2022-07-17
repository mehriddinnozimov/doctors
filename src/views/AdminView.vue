<template>
	<div class="mt-5">
		<DoctorModal title="Update Doctor" ref="updateModal" :action="update" :doctor="updateDoctor"></DoctorModal>
		<div class="title is-4">Shifokorlar ro`yxati</div>
		<div v-if="table">
			<TableVue :table="table" :update="updateStart" :remove="remove"></TableVue>
			<DoctorModal title="Add Doctor" ref="createModal" :action="create" :doctor="doctor"></DoctorModal>
			<button class="button is-primary" @click="createStart">Add</button>
		</div>
	</div>
</template>

<script>
import TableVue from '../components/Table'
import DoctorModal from '../components/DoctorModal'

const setupInitialData = () => ({
	firstName: "",
	lastName: "",
	stage: 0,
	job: "",
	avatar: "",
	room: 0
})
export default {
	components: {
		TableVue,
		DoctorModal
	},
	computed: {
		table(){ return this.$store.getters["doctors/getDoctorsTable"] }
	},
	data(){ return { 
		doctor: setupInitialData(),
		updateDoctor: setupInitialData()
	} },
	methods: {
		updateStart(index){
			this.updateDoctor = this.table.body[index]
			this.$refs.updateModal.open()
		},
		remove(id){
			this.$store.dispatch("doctors/remove", { id: id, onSuccess: () => this.$router.push("/admin") })
		},
		create(){
			this.$store.dispatch("doctors/create", { form: this.doctor, onSuccess: () => this.$router.push("/admin") })
		},
		createStart(){
			this.$refs.createModal.open()
		},
		update(){
			this.$store.dispatch("doctors/update", { form: this.updateDoctor, onSuccess: () => this.$router.push("/admin") })
		}
	}
}
</script>

<style scoped>
</style>