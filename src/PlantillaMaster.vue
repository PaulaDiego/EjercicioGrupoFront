<template>
<div id="master" class="center-block">
	<ul v-if = "plantillas"  class="list-group">
	<p>Seleccione una plantilla para editarla o cree una nueva plantilla</p>
	<p><input type="button" name="crear" value="Nueva Plantilla" v-on:click = "showDetail"/></p>
	<a href="#" class="list-group-item row col-md-4" v-for= "plantilla in plantillas" v-on:click= "showDetail" id="plantilla.Id" v-bind:id = "plantilla.Id">Plantilla Tipo: {{plantilla.Tipo}}</a>
	</ul> 
	<div v-else>
	<p>No hay plantillas disponibles cree una nueva plantilla</p>
	<p><input type="button" name="crear" value="Nueva Plantilla" v-on:click = "showDetail"/></p>
	</div>
	<div id="detail"></div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import PlantillaDetail from './PlantillaDetail.vue'
import {EventBus} from './EventBus.js'
export default{
	name: 'master',
	data () {
		return {
			plantillas: null
		}
	},
	created(){
		this.getAll()
		EventBus.$on('cambiosPlantilla',
			this.getAll
		)
		
	},
	methods: {
		getAll: function(){
			axios.get('http://10.60.23.11:50514/api/plantillas')
			.then (result => {
				this.plantillas = result.data;
			})
		},
		showDetail: function(event){
			let plantilla = this.devuelvePlantilla(event.target.id)
			new Vue({
				el: '#detail',
				data:{
					plantilla:plantilla
				},
				render: h => h(PlantillaDetail)
			})
		},
		devuelvePlantilla: function(id){
			var resultado
			this.plantillas.forEach(function(plantilla){
				if(plantilla.Id == id){
					resultado = plantilla
				}		

			})
			return resultado
		}
	}
}
</script>