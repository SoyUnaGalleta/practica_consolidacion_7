<template>
    <div id="InformacionComponent">    
        <div class="informacion uno"><i class="icon icon2 fas fa-users"></i>Cantidad total de alumnos permitidos: {{ alumnosPermitidos }} alumnos.</div>
        <div class="informacion dos"><i class="icon icon2 fas fa-user-check"></i>Cantidad total de alumnos inscritos: {{ alumnosInscritos }} alumnos.</div>
        <div class="informacion tres"><i class="icon icon2 fas fa-user-plus"></i>Cantidad total de cupos restantes: {{ alumnosPermitidos - alumnosInscritos }} alumnos.</div>
        <div class="informacion cuatro"><i class="icon icon2 fas fa-exclamation"></i>Cantidad total de cursos terminados: {{ cursosFinalizados }} cursos.</div>
        <div class="informacion cinco"><i class="icon icon2 fas fa-bullhorn"></i>Cantidad total de cursos activos: {{  cantidadCursos - cursosFinalizados  }} cursos.</div>
        <div class="informacion seis"><i class="icon icon2 fas fa-bell"></i>Cantidad total de cursos: {{ cantidadCursos  }} cursos.</div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name:'InformacionComponent',
    data: function () {
        return {

        }
    },
    methods: {
    },
    computed: {
        ...mapState('datos_cursos',['datos']),
        ...mapGetters('datos_cursos',['alumnosPermitidos','alumnosInscritos','cantidadCursos','cursosFinalizados'])
    },
    watch: {},
    created() {
    }
}
</script>

<style scoped>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";
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

</style>