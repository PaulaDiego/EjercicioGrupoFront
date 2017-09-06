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
			<input type ="button" name="aceptar" value="Aceptar"  v-on:click="aceptar"/>
			<input v-if="tipoDoc.Id" type ="button" name="eliminar" value="Eliminar" v-on:click="eliminar"/>
			<input v-else type ="button" name="cancelar" value="Cancelar" v-on:click="cerrarDetalle"/>
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
			//axios.delete('http://10.60.23.26:50514/api/TipoDocumento/'+this.tipoDoc.Id) //Ruben
			axios.delete('http://10.60.23.11:50514/api/TipoDocumento/'+this.tipoDoc.Id) //Paula
				.then(
					result => {
						this.tipoDoc = result.data
						EventBus.$emit('cambiosTipoDoc',this.tipoDoc)
						alert('Tipo de Documento eliminado')
						this.cerrarDetalle()
				}).catch(function(){
					alert("Error al eliminar")
				})
		},
		aceptar: function(){
			let id = this.tipoDoc.Id
			if(id == null){
				this.tipoDoc.Id = 0
				//axios.post('http://10.60.23.26:50514/api/TipoDocumento',this.tipoDoc) //Ruben
				axios.post('http://10.60.23.11:50514/api/TipoDocumento',this.tipoDoc) //Paula
				.then(
					result => {
						this.tipoDoc = result.data
						EventBus.$emit('cambiosTipoDoc',this.tipoDoc)
						alert('Tipo de Documento creado con exito')
						this.cerrarDetalle()
				}).catch(function(){
					alert("Error al crear el documento")
				})
			}else{
				//axios.put('http://10.60.23.26:50514/api/TipoDocumento/'+this.tipoDoc.Id,this.tipoDoc) //Ruben
				axios.put('http://10.60.23.11:50514/api/TipoDocumento/'+this.tipoDoc.Id,this.tipoDoc) //Paula
				.then(
					result => {
						this.tipoDoc = result.data
						EventBus.$emit('cambiosTipoDoc',this.tipoDoc)
						alert('Tipo de Documento actualizado con exito')
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
