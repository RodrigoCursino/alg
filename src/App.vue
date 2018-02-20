<template>
  <div id="app" class="app">
    <layout v-if="logado"></layout>
    <auth-layout v-else @logado="login" @cadastro="singUP" ></auth-layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import http from 'axios'
  import AuthLayout from './components/layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout
    },
    data () {
      return {
        logado: false,
        usuario: {}
      }
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      }
    },
    methods: {
      login (user) {
        http.get('http://localhost:8084/alg-judge/rest/usuario/login',
          {headers: {'Authorization': 'Basic ' + btoa(user.email + ':' + user.senha)}}
        ).then(response => {
          sessionStorage.setItem('token', response.data.token)
          console.log('Login', response)
          this.logado = true
        })
      },
      singUP (user) {
        http.post('http://localhost:8084/alg-judge/rest/usuario/signup', user,
        {headers: {'Content-Type': 'application/json', 'Accept': '*/*', 'Cache-Control': 'no-cache'}}
        ).then(response => {
          console.log('Cadastro', response)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
