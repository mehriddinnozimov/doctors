<template>
	<ModalVue :title="title" :action="action" ref="modalRef">
		<div>
			<div class="field">
			  <label class="label">First Name</label>
			  <div class="control">
			    <input class="input" type="text" placeholder="Name" v-model="doctor.firstName">
			  </div>
			</div>
			<div class="field">
			  <label class="label">Last Name</label>
			  <div class="control">
			    <input class="input" type="text" placeholder="Name" v-model="doctor.lastName">
			  </div>
			</div>
			<div class="field">
			  <label class="label">Job</label>
			  <div class="control">
			    <input class="input" type="text" placeholder="Job" v-model="doctor.job">
			  </div>
			</div>
			<div class="field">
			  <label class="label">Stage</label>
			  <div class="control">
			    <div class="select is-fullwidth">
			      <select v-model="doctor.stage">
			        <option value="0">0</option>
			        <option value="1">1</option>
			        <option value="2">2</option>
			        <option value="3">3</option>
			        <option value="4">4</option>
			      </select>
			    </div>
			  </div>
			</div>
			<div class="field">
			  <label class="label">Room</label>
			  <div class="control">
			    <input class="input" type="number" placeholder="Room" v-model="doctor.room">
			  </div>
			</div>
			<figure class="image is-fullwidth" v-if="doctor.avatar.length > 0">
			  <img :src="doctor.avatar">
			</figure>
			<div class="file mt-3">
			  <label class="file-label">
			    <input class="file-input" type="file" name="resume" accept="image/*" @change="handleUpload">
			    <span class="file-cta">
			      <span class="file-icon">
			        <fai icon="upload"></fai>
			      </span>
			      <span class="file-label">
			        Rasm yuklash...
			      </span>
			    </span>
			  </label>
			</div>			
		</div>
	</ModalVue>
</template>

<script>
import ModalVue from './Modal'

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		action: {
			type: Function,
			default: () => {}
		},
		doctor: {
			type: Object,
			required: true
		}
	},
	components: {
		ModalVue
	},
	methods: {
		open(){ this.$refs.modalRef.open() },
		close(){ this.$refs.modalRef.close() },
		handleUpload(e){ 
      const file = e.target.files[0]
      if(!file) return;
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        this.$store.dispatch("doctors/uploadImage", {
          file: {
            bytes: reader.result,
            name: file.name,
            size: file.size
          }, 
          onSuccess: (url) => {
            this.doctor.avatar = url
          }
        })
      }
    }
	}
}
</script>