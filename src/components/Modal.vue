<template>
	<div>
		<div class="modal" :class="{'is-active': isActive}">
		  <div class="modal-background"></div>
		  <div class="modal-card">
		    <header class="modal-card-head">
		      <p class="modal-card-title">{{ title }}</p>
		      <button class="delete" aria-label="close" @click="close"></button>
		    </header>
		    <section class="modal-card-body">
		      <slot />
		    </section>
		    <footer class="modal-card-foot">
		      <button class="button is-success" @click="save">Save</button>
		      <button class="button" @click="close">Cancel</button>
		    </footer>
		  </div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalVue',
	data(){ return {
		isActive: false
	} },
	methods: {
		open(){ this.isActive = true },
		close(){ this.isActive = false },
		save(){
			this.isActive = false
			this.action()
		}
	},
	props: {
		title: {
			type: String,
			required: true
		},
		action: {
			type: Function,
			default: () => {}
		}
	}
}
</script>