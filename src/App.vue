<template>
  <div class="container app">
    <NavbarVue></NavbarVue>      
    <router-view/>      
    <div class="footer"><FooterVue></FooterVue></div>      
  </div>
</template>

<script>
import NavbarVue from './components/Navbar'
import FooterVue from './components/Footer'
console.log(this)
export default {
  components: {
    NavbarVue,
    FooterVue
  },
  created() {
    this.$store.dispatch("doctors/getDoctors")
  },
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
@import '~bulma/bulma.sass';
.clickable {
  cursor: pointer;
}
.app {
  width: 1080px;
  height: 1920px;
}


.footer {
  position:absolute;
  bottom:0;
  width: 100%;
}
</style>