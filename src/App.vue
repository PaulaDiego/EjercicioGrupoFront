<template>
  <div id="app" class="row center-block col-md-offset-2 col-md-10">
    <h1 id="plantilla" v-on:click="showMaster" class="col-spaced col-md-6 btn btn-secondary btn btn-md">Plantillas</h1>
    <h1 id="documento" v-on:click="showMaster" class="col-spaced col-md-6 btn btn-secondary btn btn-md">Tipos de Documento</h1>
    <div id="master"></div>
  </div>
  
</template>
<script>
import Vue from 'vue'
import PlantillaMaster from './PlantillaMaster.vue'
export default {
  name: 'app',
  data(){
    return {
      plantillaSelected :false,
      documentoSelected:false
    }
    
  },
  methods: {
    showMaster:function(event){
      let id = event.target.id
      switch (id){
        case "plantilla":
            this.plantillaSelected=true
            new Vue({
              el: '#master',
              render: h => h(PlantillaMaster)
            })
            this.documentoSelected=false
          break
        case "documentos":
            this.documentoSelected=true
            /*new Vue({
              el: '#master',
              render: h => h(DocumentoMaster)
            })*/
            this.plantillaSelected=false
          break
      }
    }
  }
}
</script>