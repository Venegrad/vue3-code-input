<template>
	<section id="app" class="container">
		<venCodeInput
			v-model="vvalue"
			:upper="true"
			:lower="false"
			:length="5"
			:disallow="/[^a-zA-Z0-9]/g"
			:blurdone="true"
			@changed="changed"
		/>
		<h2 class="gtitle">Values: </h2>
		<p class="gtext">V-model: {{ vvalue }}</p>
	</section>
</template>

<script>
	import { defineComponent } from 'vue';
	import venCodeInput from '@/venCodeInput.vue';


	export default defineComponent({
		name: 'ServeDev',
		components: {
			venCodeInput
		},
		data() {
			return {
				vvalue: null,
			};
		},
		methods: {
			changed(val) {
				console.log("changed")
			}
		}
	});
</script>

<style>
	body {
		padding: 20px;
		margin: 0;
		background-color: #333;
		font-family: 'Tahoma';
	}

	.gtitle {
		width: 100%;
		color: #fff;
	}

	.gtext {
		color: #fff;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin-top: 60px;
		max-width: 1000px;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}
</style>
