<template>
<div id="detail">
	<form onsubmit="return false" v-if="active">
		<h3 v-if="tipoDoc.Id">Actualización de Tipo de Documento</h3>
		<h3 v-else>Nuevo Tipo de Documento</h3>
		<input type="hidden" id="id" v-model:value="tipoDoc.Id"/>
		
		<p>
			<label for="descripcion">Descripcion:</label>
			<input type="text" required id="descripcion" v-model:value="tipoDoc.Descripcion"/>
		</p>
		
		<p>
			<label for="mime">Mime:</label>
			<input type="text" required id="mime" v-model:value="tipoDoc.Mime"/>
		</p>
		
		<p>
			<label for="extension">Extension:</label>
			<input type="text" required id="extension" v-model:value="tipoDoc.Extension"/>
		</p>
		
		
		<p>
			<input type ="button" name="aceptar" value="Aceptar"  class="btn btn-success" v-on:click="aceptar"/>
			<input type ="button" name="cancelar" value="Cancelar" class="btn btn-secondary" v-on:click="cerrarDetalle"/>
			<input v-if="tipoDoc.Id" type ="button" name="eliminar" value="Eliminar" class="btn btn-danger"v-on:click="eliminar"/>
			
		</p>
			
	</form>
	
</div>
</template>


<script>
import {EventBus} from './EventBus.js'
import axios from 'axios'

export default {
	name: 'detail',
	data(){
		return {
			tipoDoc: this.tipoDoc,
			active : true
		}
	},
	created() {
		if(this.$parent.tipoDoc != undefined){
			this.tipoDoc = this.$parent.tipoDoc
		}else{
			this.tipoDoc = {
				Id: null,
				Descripcion: "",
				Mime:"",
				Extension:""
			}
		}
	},
	methods: {
		eliminar: function(){
			axios.delete(SERVER+'/api/TipoDocumento/'+this.tipoDoc.Id)
				.then(
					result => {
						this.tipoDoc = result.data
						EventBus.$emit('cambiosTipoDoc',this.tipoDoc)
						this.cerrarDetalle()
				}).catch(function(){
					alert("Error al eliminar")
				})
		},
		aceptar: function(){
			let id = this.tipoDoc.Id
			if(id == null){
				this.tipoDoc.Id = 0
				axios.post(SERVER+'/api/TipoDocumento',this.tipoDoc)
				.then(
					result => {
						this.tipoDoc = result.data
						EventBus.$emit('cambiosTipoDoc',this.tipoDoc)
						this.cerrarDetalle()
				}).catch(function(){
					alert("Error al crear el documento")
				})
			}else{
				axios.put(SERVER + '/api/TipoDocumento/'+this.tipoDoc.Id,this.tipoDoc)
				.then(
					result => {
						EventBus.$emit('cambiosTipoDoc',this.tipoDoc)
						this.cerrarDetalle()
				}).catch(function(){
					alert("Error al actualizar el documento")
				})
			}
			
		},
		cerrarDetalle: function(){
			this.active = false
		}
	}

}

</script>
