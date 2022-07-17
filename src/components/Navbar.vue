<template>
	<nav class="navbar h-100" role="navigation" aria-label="main navigation">
	  <div class="navbar-brand">
	    <router-link class="navbar-item" to="/">
	      	<img src="../assets/logo.png" width="116" height="58">	    		
	    </router-link>

	    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	    </a>
	  </div>

	  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isActive}">
	    <div class="navbar-end">
	      <div class="navbar-item">
	        <div class="buttons">
	          <router-link class="navbar-item" to="/login" v-if="!profile">{{ language.login }}</router-link>
	          <template v-else>
	          	<router-link class="navbar-item" to="/admin">{{ language.dashboard }}</router-link>
	          	<a class="navbar-item clickable" @click="logout">{{ language.logout }}</a>         	
	          </template>
	        </div>
	      </div>
	    </div>
	  </div>
	</nav>
</template>

<script>
export default {
	name :'NavbarVue',
	data(){ return {
		isActive: false
	} },
	computed: {
		profile(){
			return this.$store.state.profile.data
		},
		language(){ return this.$store.state.language.data.nav }
	},
	methods: {
		logout(){
			this.$store.dispatch("profile/logout", { onSuccess: () => this.$router.push("/") })
		},
		handleWindowResize(e){
      if(this.isActive && e.target.innerWidth > 1020) this.isActive = false
    }
	},
	created(){
    window.addEventListener("resize", this.handleWindowResize)
  },
  unmounted(){
    window.removeEventListener("resize", this.handleWindowResize)
  }
}
</script>