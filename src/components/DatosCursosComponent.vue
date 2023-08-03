<template>
    <div id="DatosCursosComponent">
        <b-row class="tablaestilo titulo">
            <b-col cols="3" class="justificar">Cursos</b-col>
            <b-col cols="1">Cupos</b-col>
            <b-col cols="1">Inscritos</b-col>
            <b-col cols="1">Duración</b-col>
            <b-col cols="1">Costo</b-col>
            <b-col cols="1">Terminado</b-col>
            <b-col cols="2">Fecha</b-col>
            <b-col cols="2">Acciones</b-col>
        </b-row>
        <b-row class="tablaestilo" v-for="(dato,index) in datos" :key="index">
            <b-col cols="3" class="d-flex align-items-center">{{ dato.nombre }}</b-col>
            <b-col cols="1" class="d-flex align-items-center justify-content-center">{{ dato.cupos }}</b-col>
            <b-col cols="1" class="d-flex align-items-center justify-content-center">{{ dato.inscritos }}</b-col>
            <b-col cols="1" class="d-flex align-items-center justify-content-center">{{ dato.duracion }}</b-col>
            <b-col cols="1" class="d-flex align-items-center justify-content-center"><p class="fondobtn verde">${{ dato.costo }}</p></b-col>
            <b-col cols="1" class="d-flex align-items-center justify-content-center justify-content-center">
                <p class="fondobtn azul" v-if="dato.completado">Si</p>
                <p class="fondobtn gris" v-else>No</p></b-col>
            <b-col cols="2" class="d-flex align-items-center justify-content-center"><p class="fondobtn verde">{{ dato.fecha_registro }}</p></b-col>
            <b-col cols="2" class="d-flex justify-content-around">

                <b-button pill variant="outline-warning boton" @click="rutaEditar(dato.nombre, dato.id)"><i class="icon fas fa-pen"></i></b-button>

                <b-button pill variant="outline-danger boton" @click="mostrarAlertaCurso(index, dato.id, dato.nombre)"><i class="icon fas fa-trash"></i></b-button>
                
            </b-col>
        </b-row>


        <b-modal id="modal-scoped-2">
        <template #modal-header>
            <h5>Va a eliminar el curso de {{ nombreBorrar }}</h5>
        </template>

        <template #default>
        <p>¿Esta seguro que quiere prodecer?</p>
        </template>

        <template #modal-footer>
            <b-button size="sm" variant="success" @click="eliminar(identificador)">
                Borrar
            </b-button>
            <b-button size="sm" variant="danger" @click="cancelar()">
                Cancelar
            </b-button>
        </template>
    </b-modal>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name:'DatosCursosComponent',
    data: function () {
        return {
            form: {
                id: 0,
                completado: false,
                nombre: '',
                img: '',
                cupos: 0,
                inscritos: 0,
                duracion: '',
                fecha_registro: '',
                costo: '',
                descripcion: ''
            },
            indice: 0,
            identificador: 0,
            nombreBorrar: ''
        }
    },
    methods: {
        ...mapActions('datos_cursos',['quitarCurso','editarCurso',]),
        eliminar(id) {
            this.$bvModal.hide('modal-scoped-2')
            this.quitarCurso(id)
        },
        rutaEditar(name, id) {
            /* En este si se puede editar la fecha y el estado */
            /* this.form.inscritos <= this.form.cupos */
            /* Si se modifica el estado del curso de activo ha terminado (cerrado), la cantidad de inscritos debe automáticamente modificarse a cero. */
            this.editarCurso(id)
            this.$router.push(`/editarcurso/${name}`)
        },
        mostrarAlertaCurso(index, id, nombre) {
            this.nombreBorrar = nombre            
            this.indice = index
            this.identificador = id
            this.$bvModal.show('modal-scoped-2')
        },
        cancelar() {
            this.$bvModal.hide('modal-scoped-2')
        }
    },
    computed: {
        ...mapState('datos_cursos',['datos','formulario_para_editar']),
    },
    watch: {},
    created() {
    }
}
</script>

<style scoped>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";

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

.btnmargenes{
    margin: 30px;
}
</style>