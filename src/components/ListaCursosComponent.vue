<template>
    <div id="ListaCursosComponent">
        <h1>Lista de Cursos</h1>
        <b-button variant="primary" class="btnmargenes" @click.prevent="mortrarDiponibles()" v-if="mostrar">MOSTRAR SOLO CURSOS DISPONIBLES</b-button>
        <b-button variant="primary" class="btnmargenes" @click.prevent="mortrarTodos()" v-if="!mostrar">MOSTRAR TODOS LOS CURSOS</b-button>
        <div class="contenedor">

            <b-card
            :img-src=dato.img
            img-alt="Image"
            img-top
            tag="article"
            style="width: 250px;"
            class="mb-2 tarjeta"
            v-for="(dato,index) in datos"
            :key="index"
            v-if="mostrar ? true : !dato.completado"
            >
                <h5>{{ dato.nombre }}</h5>
                <b-card-text>

                    <b-row>
                        <b-col cols="3" class="izquierda">
                            <div class="linea">
                                <div class="circulo">
                                    <div class="circulo2 fondo1"></div>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="9" class="margenes">
                            <p><b>Costo:</b> ${{ dato.costo }}</p>
                            <p><b>Duración:</b> {{ dato.duracion }}</p>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="3" class="izquierda">
                            <div class="linea">
                                <div class="circulo">
                                    <div class="circulo2 fondo2"></div>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="9" class="margenes">
                            <p><b>Cupos:</b> {{ dato.cupos }}</p>
                            <p>
                                <b>Completado: </b> 
                                <p v-if="dato.completado">Si</p>
                                <p v-else>No</p>
                            </p>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="3" class="izquierda">
                            <div class="linea">
                                <div class="circulo">
                                    <div class="circulo2 fondo1"></div>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="9" class="margenes">
                            <p><b>Fecha de registro:</b> </p>
                            <p>{{ dato.fecha_registro }}</p>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="3" class="izquierda">
                            <div class="linea">
                                <div class="circulo">
                                    <div class="circulo2 fondo2"></div>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="9" class="margenes">
                            <p><b>Descripción:</b></p>
                            <p>{{ dato.descripcion }}</p>
                        </b-col>
                    </b-row>

                </b-card-text>
            </b-card>


        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ListaCursosComponent',
    data: function () {
        return {
            mostrar: true,
        }
    },
    methods: {
        mortrarDiponibles() {
            this.mostrar = false
        },
        mortrarTodos() {
            this.mostrar = true
        }
    },
    computed: {
        ...mapState('datos_cursos',['datos'])
    },
    watch: {},
    created() {
    }
}
</script>

<style scoped>
#ListaCursosComponent {
    margin: 1% 2%;
}
.contenedor {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.tarjeta {
    margin: 10px;
}
.tarjeta img {
    object-fit: cover;
    height: 180px;
    max-width: 100%;
}
.izquierda {
    display: flex;
    justify-content: center;
}
.linea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #aaa;
    width: 1px;
}
.circulo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 100%;
    height: 30px;
    width: 30px;
}
.circulo2 {
    border-radius: 100%;
    height: 22px;
    width: 22px;
}
.fondo1 {
    background-color: #7E57C2;
}
.fondo2 {
    background-color: #26A69A;
}
.margenes {
    font-size: 14px;
    text-align: justify;
    margin: 15px 0px;
}

.btnmargenes{
    margin: 30px;
}
p{
    line-height: 140%;
    margin: 0px;
    padding: 0px
}
</style>