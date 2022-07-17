<template>
	<table class="table is-fullwidth is-hoverable">
		<thead>
			<tr>
				<th>#</th>
				<th v-for="head in table.heads" :key="head.k">{{ head.value }}</th>
				<th v-if="update">Update</th>
				<th v-if="remove">Remove</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in table.body" :key="`k-${item['id']}`" >
				<th>{{index+1}}</th>
				<template v-for="head in table.heads">
					<td v-if="head.key == 'avatar'">
						<figure class="image is-64x64">
						  <img :src="item.avatar">
						</figure>
					</td>
					<td v-else>{{item[head.key]}}</td>
				</template>
				<td v-if="update"><button  @click="() => update(index)" class="button is-info is-small"><fai icon="pen" class="has-text-white"></fai></button></td>
				<td v-if="remove"><button @click="() => remove(item['id'])"  class="button is-danger is-small"><fai icon="trash" class="has-text-white"></fai></button></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'TableVue',
	props: {
		table: {
			type: Object,
			required: true
		},
		update: {
			type: Function,
			default: null
		},
		remove: {
			type: Function,
			default: null
		}
	}
}
</script>

<style scoped>
td, th {
	vertical-align: middle!important;
}
</style>