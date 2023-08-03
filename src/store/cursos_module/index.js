import axios from "axios"

const datos_cursos = {
    namespaced: true,
    state: {
        datos: {},
        verInfo: false,
        conteoID: 6,
        formulario_para_editar: {
            nombre: '',
            img: '',
            cupos: 0,
            inscritos: 0,
            duracion: '',
            fecha_registro: '',
            costo: '',
            descripcion: ''
        }
    },
    getters: {
        alumnosPermitidos: state => {
            return state.datos.reduce ((acumulado, actual) => {
                return acumulado + (Number(actual.cupos))
            }, 0)
        },
        alumnosInscritos: state => {
            return state.datos.reduce ((acum, actual) => {
                return acum + (Number(actual.inscritos))
            }, 0)
        },
        cantidadCursos: state => {
            return state.datos.length
        },
        cursosFinalizados: state => {
            return state.datos.filter ( finalizado => finalizado.completado ).length
        }
    },
    mutations: {
        READ_API: (state, info) => {
            state.datos = info
            state.verInfo = true
        },
        QUITAR_CURSO: (state, id) => {
            let index = state.datos.findIndex ( curso => curso.id === id )
            state.datos.splice(index,1)
        },
        AGREGAR_CURSO: (state, formulario) => {
            state.conteoID ++
            formulario.id = state.conteoID

            if (formulario.inscritos < formulario.cupos) {
                formulario.completado = false
            } else if (formulario.inscritos == formulario.cupos) {
                formulario.completado = true
            }

            const hoy = new Date();
            function formatoFecha(fecha, formato) {
                const map = {
                    dd: fecha.getDate().toString().length == 1 ? `0${fecha.getDate()}` : fecha.getDate(),
                    mm: (fecha.getMonth() + 1).toString().length == 1 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1,
                    yy: fecha.getFullYear(),
                }
            
                return formato.replace(/dd|mm|yy/gi, matched => map[matched])
            }

            formulario.fecha_registro = formatoFecha(hoy, 'dd/mm/yy');

            state.datos.push(formulario)
        },
        EDITAR_CURSO: (state, id) => {
            let index = state.datos.findIndex ( curso => curso.id === id )
            state.formulario_para_editar = state.datos[index]
            let fechaString = state.datos[index].fecha_registro;
            let partesFecha = fechaString.split('/');
            let fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
            state.formulario_para_editar.fecha_registro = fechaFormateada
        },
        GUARDAR_CAMBIOS_EDICION: (state, info) => {
            let index = state.datos.findIndex ( curso => curso.id === info.id )

            function formatoFecha(fecha, formato) {
                let partesFecha = fecha.split('-');
                const map = {
                    dd: `${partesFecha[2]}`,
                    mm: `${partesFecha[1]}`,
                    yy: `${partesFecha[0]}`,
                }
                return formato.replace(/dd|mm|yy/gi, matched => map[matched])
            }
            info.fecha_registro = formatoFecha(info.fecha_registro, 'dd/mm/yy')
            state.datos.splice(index, 1, info)
        }
    },
    actions: {
        consultarCursos: (context) => {
            let url = "cursos.json"
            axios.get(url)
                .then( respuesta => {
                    let info = respuesta.data.cursos
                    context.commit('READ_API',info)
                })
                .catch( error => { console.log(error) })
        },
        quitarCurso: (context, id) => {
            context.commit('QUITAR_CURSO',id)
        },
        agregarCurso:(context, formulario) => {
            context.commit('AGREGAR_CURSO', formulario)
        },
        editarCurso: (context, id) => {
            context.commit('EDITAR_CURSO', id)
        },
        guardarCambiosEdicion: (context, info) => {
            context.commit('GUARDAR_CAMBIOS_EDICION', info)
        }
    },
    modules: {
    }
}

export default datos_cursos