<template>
  <div id="app" class="app">
    <layout v-if="isLog"></layout>
    <auth-layout v-else @logado="login" @cadastro="singUP" ></auth-layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import http from 'axios'
  import User from './model/User'
  import AuthLayout from './components/layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      },
      isLog () {
        return this.isLogado()
      }
    },
    methods: {
      login (user) {
        http.get('http://localhost:8084/alg-judge/rest/usuario/login',
          {headers: {'Authorization': 'Basic ' + btoa(user.email + ':' + user.senha)}}
        ).then(response => {
          sessionStorage.setItem('token', response.data.token)
          this.usuarioLogado(response.data)
          this.isLogado()
          console.log('Login', response)
          this.logado = true
        })
      },
      isLogado () {
        const token = sessionStorage.getItem('token')
        if (token) {
          return true
        } else {
          return false
        }
      },
      usuarioLogado (user) {
        const payload = User.LOGIN(user)
        this.$store.commit('USER_LOGADO', payload)
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
