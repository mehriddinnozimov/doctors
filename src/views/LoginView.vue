<template>
	<form class="is-halfwidth box center mt-5">
		<div class="field">
		  <label class="label">Email</label>
		  <div class="control">
		    <input class="input" type="email" placeholder="Email" autocomplete="email" v-model="form.email">
		  </div>
		</div>
		<div class="field">
		  <label class="label">Password</label>
		  <div class="control">
		    <input class="input" type="password" placeholder="Password" autocomplete="current-password" v-model="form.password">
		  </div>
		</div>		
		<div class="field">
		  <div class="control">
		    <button class="button is-link" type="button" @click="login">LogIn</button>
		  </div>
		</div>
	</form>
</template>

<script>
const setupInitialData = () => ({ email: "", password: "" })
export default {
	name: 'LoginView',
	data(){ return {
		form: setupInitialData()
	} },
	methods: {
		login(){
			this.$store.dispatch("profile/login", { form: this.form, onSuccess: () => this.$router.push("/admin") })
			this.form = setupInitialData()
		}
	}
}
</script>

<style scoped>
	.is-halfwidth {
		max-width: 350px;
	}
	.center {
		margin-left: auto;
		margin-right: auto;
	}
</style>