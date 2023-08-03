<template>
    <div id="AdministradorView">
        <h1>Administración</h1>
        <AgregarCursoComponent />
        <DatosCursosComponent />
       <div v-if="verInfo" class="divInfo">
            <InformacionComponent />
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import AgregarCursoComponent from '../components/AgregarCursoComponent.vue'
import DatosCursosComponent from '../components/DatosCursosComponent.vue'
import InformacionComponent from '../components/InformacionComponent.vue'

export default {
    name:'AdministradorView',
    components: {
        AgregarCursoComponent,
        DatosCursosComponent,
        InformacionComponent
    },
    data: function () {
        return {

        }
    },
    methods: {
    },
    computed: {
        ...mapState('datos_cursos',['datos','verInfo']),
    },
    watch: {},
    created() {
    }
}
</script>

<style scoped>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";

#AdministradorView {
    margin: 2% 5%;
}
.tablaestilo {
    font-size: 14px;
    line-height: 100%;
    border-bottom: 1px solid #aaa;
    margin-bottom: 1px;
    padding:5px 0px;
}
.justificar{
    text-align: justify;
}
.titulo{
    font-size: 15px;
    font-weight: bold;
    padding: 15px 5px 20px 5px;
}
.fondobtn{
    color: #fff;
    text-align: center;
    border-radius: 15px;
    padding: 8px 10px;
    margin: 5px 0px 5px 0px;
}

.verde {
    background: #04cc54;
}

.azul {
    background: #15b5fc;
}
.gris{
    background: #c4b2ad;
}
.informacion{
    font-size: 15px;
    font-weight: bold;
    text-align: justify;
    border-radius: 5px;
    margin-bottom: 12px;
    padding: 10px;
}
.uno{
    color: #8c24ac;
    border: 1px solid  #8c24ac;
}
.dos{
    color: #44a4f4;
    border: 1px solid #44a4f4;
}
.tres{
    color: #e43c34;
    border: 1px solid #e43c34;
}
.cuatro{
    color: #dc2668 ;
    border: 1px solid #dc2668 ;
}
.cinco{
    color: #887414 ;
    border: 1px solid #887414 ;
}
.seis{
    color: #f87c14 ;
    border: 1px solid #f87c14 ;
}

.icon2 {
    font-size: 16px;
    margin: 0px 8px;
}
.divInfo {
    margin-top: 50px;
}
.btnmargenes{
    margin: 30px;
}
</style>