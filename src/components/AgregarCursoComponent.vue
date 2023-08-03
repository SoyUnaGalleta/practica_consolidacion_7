<template>
    <div id="AgregarCursoComponent">

        <b-button variant="primary" class="btnmargenes" @click="$bvModal.show('modal-scoped')">AGREGAR CURSO</b-button>
        
        <b-modal id="modal-scoped">
            <template #modal-header>
                <h5>Agregar Curso</h5>
            </template>
            
            <form class="estilosformularios">

                <b-form-group id="txtNombre" label="Nombre:" label-for="txtNombre" class="margenFormulario">
                    <b-form-input
                    id="txtNombre"
                    v-model="form.nombre"
                    placeholder="Ingresa nombre del curso"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="txtImg" label="URL de la imagen:" label-for="txtImg" class="margenFormulario">
                    <b-form-input
                    id="txtImg"
                    v-model="form.img"
                    placeholder="Ingresa la url de una imagen"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="nCupos" label="Cupos del curso:" label-for="nCupos" class="margenFormulario">
                    <b-form-input
                    id="nCupos"
                    type="number"
                    min="0"
                    v-model="form.cupos"
                    placeholder="Ingresa número de cupos"
                    required
                    ></b-form-input>
                </b-form-group>


                <b-alert :show="mostrarAlerta" variant="danger" class="alerta">
                <div>¡Llenaste los cupos disponibles! No puedes inscribir más alumnos a menos que aumentes el cupo del curso.</div>
                <div @click="mostrarAlerta = false" class="alertaX">x</div>
                </b-alert>



                <b-form-group id="nInscritos" label="Inscritos del curso:" label-for="nInscritos" class="margenFormulario">
                    <b-form-input
                    id="nInscritos"
                    type="number"
                    v-model="form.inscritos"
                    :max="form.cupos"
                    placeholder="Ingresa número de inscritos"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="txtDuracion" label="Duración del curso:" label-for="txtDuracion" class="margenFormulario">
                    <b-form-input
                    id="txtDuracion"
                    v-model="form.duracion"
                    placeholder="Ingresa la duración del curso"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="nCosto" label="Costo del curso:" label-for="nCosto" class="margenFormulario">
                    <b-form-input
                    id="nCosto"
                    type="number"
                    v-model="form.costo"
                    placeholder="Ingresa costo del curso"
                    required
                    ></b-form-input>
                </b-form-group>

                <p>Descripción del curso: </p>
                <b-form-textarea
                id="textarea"
                v-model="form.descripcion"
                placeholder="Escribe la descripción del curso."
                rows="3"
                widht="100%"
                ></b-form-textarea>

            </form>
        
            <template #modal-footer>
            
            <b-button size="sm" variant="success" @click="agregar()">
                AGREGAR
            </b-button>
            <b-button size="sm" variant="warning" @click="clean()">
                LIMPIAR FORMULARIO
            </b-button>
            <b-button size="sm" variant="danger" @click="cancelar()">
                CANCELAR
            </b-button>
            </template>

        </b-modal>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name:'AgregarCursoComponent',
    data: function () {
        return {
            form: {
                nombre: '',
                img: '',
                cupos: 0,
                inscritos: 0,
                duracion: '',
                costo: '',
                descripcion: ''
            },
            mostrarAlerta: false,
        }
    },
    methods: {
        ...mapActions('datos_cursos',['agregarCurso']),
        agregar() {
            if (
                this.form.nombre != ''
                && this.form.img != ''
                && this.form.cupos >= 0
                && this.form.inscritos >= 0
                && this.form.duracion != ''
                && this.form.costo >= 0
                && this.form.descripcion != ''
                && this.form.inscritos <= this.form.cupos
            ){
                let data = {...this.form}
                this.agregarCurso(data)
                this.clean()
                this.$bvModal.hide('modal-scoped')
            }
        },
        clean() {
            this.form.nombre = ''
            this.form.img = ''
            this.form.cupos = 0
            this.form.inscritos = 0
            this.form.duracion = ''
            this.form.costo = 0
            this.form.descripcion = ''
        },
        cancelar() {
            this.clean()
            this.$bvModal.hide('modal-scoped')
        },
    },
    computed: {
        ...mapState('datos_cursos',['datos']),
    },
    watch: {
        'form.inscritos' (newValue) {
            if (newValue == this.form.cupos ){
                this.mostrarAlerta = true
            }
        }
    },
    created() {
    }
}
</script>

<style scoped>
.btnmargenes{
    margin: 30px;
}
.margenFormulario {
    margin-bottom: 15px;
}
p{
    margin:0px;
    padding:0px;
}
.estilosformularios{
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
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