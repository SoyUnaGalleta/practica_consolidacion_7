<template>
    <div id="EditarCursoView">
        <h1>Editar Curso {{ nombre }}</h1><br>
        
        <form v-if="verInfo" class="letraupper">

            <b-form-group id="txtNombre" label="Nombre:" label-for="txtNombre" class="margenFormulario">
                <b-form-input
                id="txtNombre"
                v-model="formulario_para_editar.nombre"
                placeholder="Ingresa nombre del curso"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="txtImg" label="URL de la imagen:" label-for="txtImg" class="margenFormulario">
                <b-form-input
                id="txtImg"
                v-model="formulario_para_editar.img"
                placeholder="Ingresa la url de una imagen"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="nCupos" label="Cupos del curso:" label-for="nCupos" class="margenFormulario">
                <b-form-input
                id="nCupos"
                type="number"
                v-model="formulario_para_editar.cupos"
                placeholder="Ingresa número de cupos"
                required
                ></b-form-input>
            </b-form-group>


            <b-alert :show="mostrarAlerta" variant="danger" class="alerta">
                <div>¡Llenaste los cupos disponibles! No puedes inscribir más alumnos a menos que aumentes el cupo del curso.</div>
                <div @click="mostrarAlerta = false" class="alertaX">x</div>
            </b-alert>


            <b-form-group id="nInscritoslabel" label="Inscritos del curso:" label-for="nInscritos" class="margenFormulario">
                <b-form-input
                id="nInscritos"
                type="number"
                v-model="formulario_para_editar.inscritos"
                :max="formulario_para_editar.cupos"
                placeholder="Ingresa número de inscritos"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="bCompletado" v-slot="{ finalizado }">
                <b-form-radio v-model="formulario_para_editar.completado" :aria-describedby="finalizado" name="bCompletado" value="true">Si</b-form-radio>
                <b-form-radio v-model="formulario_para_editar.completado" :aria-describedby="finalizado" name="bCompletado" value="false">No</b-form-radio>
            </b-form-group><br>

            <b-form-group id="txtDuracion" label="Duración del curso:" label-for="txtDuracion" class="margenFormulario">
                <b-form-input
                id="txtDuracion"
                v-model="formulario_para_editar.duracion"
                placeholder="Ingresa la duración del curso"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="txtFecha" label="Fecha de Registro:" label-for="txtFecha" class="margenFormulario">
                <b-form-input
                id="txtFecha"
                type="date"
                :value="formulario_para_editar.fecha_registro"
                placeholder="Ingresa la fecha de registro"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="nCosto" label="Costo del curso:" label-for="nCosto" class="margenFormulario">
                <b-form-input
                id="nCosto"
                type="number"
                v-model="formulario_para_editar.costo"
                placeholder="Ingresa costo del curso"
                required
                ></b-form-input>
            </b-form-group>

            <p>Descripción del curso: </p>
            <b-form-textarea
            id="textarea"
            v-model="formulario_para_editar.descripcion"
            placeholder="Escribe la descripción del curso."
            rows="3"
            widht="100%"
            ></b-form-textarea>

        </form>
         <div class="d-flex justify-content-around btnmargenes">
        <b-button size="sm" variant="success" @click="guardarCambios()">
            EDITAR
        </b-button>
        <b-button size="sm" variant="danger" @click="cancelar()">
            CANCELAR
        </b-button>
        </div>

        <router-link to="/administracion">administracion</router-link>
        <br>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'EditarCursoView',
    props: ['nombre'],
    data: function () {
        return {
            mostrarAlerta: false,
            cursocompletado: false,
        }
    },
    computed: {
        ...mapState('datos_cursos',['datos','formulario_para_editar','verInfo']),
    },
    methods: {
        ...mapActions('datos_cursos',['guardarCambiosEdicion']),
        guardarCambios() {
            if (
                this.formulario_para_editar.nombre != ''
                && this.formulario_para_editar.img != ''
                && this.formulario_para_editar.cupos >= 0
                && this.formulario_para_editar.inscritos >= 0
                && this.formulario_para_editar.duracion != ''
                && this.formulario_para_editar.fecha_registro != ''
                && this.formulario_para_editar.costo >= 0
                && this.formulario_para_editar.descripcion != ''
                && this.formulario_para_editar.inscritos <= this.formulario_para_editar.cupos
            ){
                let dateControl = document.querySelector('input[type="date"]')
                this.formulario_para_editar.fecha_registro = dateControl.value
                let otradata = {...this.formulario_para_editar}
                this.guardarCambiosEdicion(otradata)
                this.$router.push(`/administracion/`)
            }
        },
        cancelar() {
            this.$router.push(`/administracion/`)
        }
    },
    watch: {
        'formulario_para_editar.inscritos' (newValue) {
            if (newValue == this.formulario_para_editar.cupos ){
                this.mostrarAlerta = true
            }
        },
        'formulario_para_editar.completado' (newValue) {
            if (newValue == 'true') {
                this.formulario_para_editar.inscritos = 0
                let inputElement = document.getElementById('nInscritos');
                inputElement.disabled = true;
            } else if (newValue == 'false' ){
                let inputElement = document.getElementById('nInscritos');
                inputElement.disabled = false;
            }
        }
    },
    created() {
    },
    mounted() {
    }
}
</script>

<style scoped>
#EditarCursoView {
    padding: 1% 20%;
    font-size: 12px;
    font-weight: bold;
    
}
.letraupper{
    letter-spacing: 1px;
    text-transform: uppercase;
}
.margenFormulario{
    margin-bottom: 30px;
}
.btnmargenes {
    margin: 40px 20px;
}
.alerta{
    display:flex;
    justify-content: space-around;
    text-align: justify;
    font-weight:500;
}

.alertaX {
    line-height: 80%;
    font-size: 25px;
    text-transform: lowercase;
    margin-left: 20px;
}
</style>