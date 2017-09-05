<template>
<div id="master" class="center-block">
	<ul v-if = "tiposDoc"  class="list-group">
	<p>Seleccione un Tipo de Documento para editarlo o cree uno nuevo</p>
	<p><input type="button" name="crear" value="Nueva Plantilla" v-on:click = "showDetail"/></p>
	<a href="#" class="list-group-item row col-md-4" v-for= "tipoDoc in tiposDoc" v-on:click= "showDetail" id="tipoDoc.Id" v-bind:id = "plantilla.Id">Plantilla Tipo: {{plantilla.Tipo}}</a>
	</ul> 
	<div v-else>
	<p>No hay tipos de documento disponibles cree uno nuevo</p>
	<p><input type="button" name="crear" value="Nuevo Tipo Documento" v-on:click = "showDetail"/></p>
	</div>
	<div id="detail"></div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import {EventBus} from './EventBus.js'
export default{
	name: 'master',
	data () {
		return {
			tiposDoc: null
		}
	},
	created(){
		this.getAll()
		EventBus.$on('cambiosTipoDoc',
			this.getAll
		)
		
	},
	methods: {
		getAll: function(){
			axios.get('http://10.60.23.11:50514/api/TipoDocumento') //Ruben
			//axios.get('http://10.60.23.11:50514/api/TipoDocumento') // Paula
			.then (result => {
				this.tiposDoc = result.data;
			})
		},
		showDetail: function(event){
			let tipoDoc = this.devuelveTipoDoc(event.target.id)
			new Vue({
				el: '#detalle',
				data:{
					tipoDoc:tipoDoc
				},
				render: h => h(DetalleTipoDoc)
			})
		},
		devuelveTipoDoc: function(id){
			var resultado
			this.tiposDoc.forEach(function(tipoDoc){
				if(tipoDoc.Id == id){
					resultado = tipoDoc
				}		

			})
			return resultado
		}
	}
}
</script>
