<template>
  <div id="app">

    <b-navbar toggleable="xl" type="dark" class="nananabar">
    <!-- Menú hamburguesa -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item><router-link to="/administracion">Administracion</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <!-- Nombre de la página en el centro -->
      <b-navbar-brand>Cursos Alfa Web</b-navbar-brand>

  </b-navbar>

    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { BNavbar, BNavbarToggle, BCollapse, BNavbarNav, BNavbarBrand, BNav, BNavItem } from 'bootstrap-vue';


export default {
    name: 'App',
    components: {
      BNavbar,
      BNavbarToggle,
      BCollapse,
      BNavbarNav,
      BNavbarBrand,
      BNav,
      BNavItem,
    },
    data: function () {
        return {

        }
    },
    methods: {
        ...mapActions('datos_cursos',['consultarCursos']),
    },
    computed: {
    },
    watch: {},
    created() {
        this.consultarCursos()
    }
}
</script>


<style>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  color: #000;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}
.nananabar {
  background-color: #7E57C2;
  
}

.paddingNav{
  padding: 0px 20px;
}
</style>
