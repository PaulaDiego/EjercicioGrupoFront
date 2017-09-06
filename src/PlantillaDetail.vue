<template>
	<div id="detail">
		
		<form onsubmit="return false" v-if="active">
			<h3 v-if="plantilla.Id">Actualización de Plantilla</h3>
			<h3 v-else>Nueva Plantilla</h3>
			<input type="hidden" id="id" v-model:value="plantilla.Id"/>
			<p><label for="tipo">Tipo: </label><input type="text" required id="sala" v-model:value="plantilla.Tipo"/></p>
			<p><label for="descripcion">Descripción: </label><textarea required id="butaca" v-model:value="plantilla.Descripcion" rows="5" cols="20"></textarea></p>

			<p v-if="plantilla.FechaCreacion"><label for="fechaCreacion">Fecha de creacion: </label><input type="date" required id="fila" v-model:value="this.plantilla.FechaCreacion.toString().split('T')[0]" readonly/></p>
			<p>
				<input type ="button" name="aceptar" value="Aceptar"  v-on:click="aceptar"/>
				<input v-if="plantilla.Id" type ="button" name="eliminar" value="Eliminar" v-on:click="eliminar"/>
				<input v-else type ="button" name="cancelar" value="Cancelar" v-on:click="cerrarDetalle"/>
			</p>
		</form>
		
	</div>
</template>

<script>
import {EventBus} from './EventBus.js'
import axios from 'axios'
export default {
	name: 'detalle',
	data(){
		return {
			plantilla:this.plantilla,
			active:true
		}
		
	},
	created() {
		if(this.$parent.plantilla != undefined){
			this.plantilla = this.$parent.plantilla
		}else{
			this.plantilla = {
				Id:null,
				Tipo:"",
				Descripcion:"",
				FechaCreacion:""
			}
		}
	},
	methods: {
		eliminar: function(){
			//axios.delete('http://10.60.23.26:50514/api/Plantillas/'+this.plantilla.Id) //Ruben
			axios.delete('http://10.60.23.11:50514/api/Plantillas/'+this.plantilla.Id) //Paula
			 .then(result => {
			 	this.plantilla = result.data
			 	EventBus.$emit('cambiosPlantilla',this.plantilla)
			 	alert('Plantilla eliminada con exito')
			 	this.cerrarDetalle()
			})
			.catch(function(){
				alert("Error al eliminar la plantilla")
			})
			
		},
		aceptar: function(){
			if(this.plantilla.Id==null || this.plantilla.Id==0){
				this.plantilla.Id = 0
				this.plantilla.FechaCreacion= new Date()
				//axios.post('http://10.60.23.26:50514/api/Plantillas',this.plantilla) //Ruben
				axios.post('http://10.60.23.11:50514/api/Plantillas',this.plantilla) //Paula
				.then(
					(plantilla)=>{
					alert('Plantilla creada con exito')
					this.plantilla.Id = plantilla.data.Id
					EventBus.$emit('cambiosPlantilla',this.plantilla)
				})
				.catch(function(){
					alert("Error al crear la plantilla")
				})
			}else{
				//axios.put('http://10.60.23.26:50514/api/TipoDocumento/'+this.plantilla.Id,this.plantilla) //Ruben
				axios.put('http://10.60.23.11:50514/api/Plantillas/'+this.plantilla.Id,this.plantilla) //Paula
				.then(
					()=>{
						alert('Plantilla actualizada con exito')
						EventBus.$emit('cambiosPlantilla',this.plantilla)
				})
				.catch(function(){
					alert("Error al actualizar la plantilla")
				})
			}
			console.log(this.plantilla)
		},
		cerrarDetalle:function(){
			this.active = false
		}
	}
}
</script>