<template>
  <div>
    <fieldset>
      <!--nome-->
      <div class="form-group with-icon-left">
        <div class="input-group">
          <input
            id="nome"
            v-model="user.nome"
            v-validate="'required'"
            :class="{'input': true, 'is-danger': errors.has('nome') }"
            name="nome"
            required="required">
          <i class="entypo entypo-user icon-left input-icon"></i>
          <label for="nome" class="control-label">
            DIGITE AQUI SEU NOME
          </label>
          <i class="bar"></i>
          <small v-show="errors.has('nome')" class="help text-danger">{{ errors.first('nome') }}</small>
        </div>
      </div>
      <!--email-->
      <div class="form-group with-icon-left">
        <div class="input-group">
          <input
            v-model="user.email"
            v-validate="'required|email'"
            :class="{'input': true, 'is-danger': errors.has('email') }"
            id="email"
            name="email"
            required="required">
          <i class="fa fa-envelope-o icon-left input-icon"></i>
          <label
            for="email"
            role="button"
            class="control-label">
            DIGITE AQUI SEU EMAIL
          </label>
          <i class="bar"></i>
          <small v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</small>
        </div>
      </div>
      <!--senha-->
      <div class="form-group">
       <div class="input-group">
        <input
          v-model="user.senha"
          v-validate="'required'"
          :class="{'input': true, 'is-danger': errors.has('senha') }"
          id="senha"
          type="password"
          name="senha"
          class="text-center text_password"
          required="required" title="">
        <label for="senha" class="control-label">
          DIGITE AQUI SUA SENHA
        </label>
        <i class="bar"></i>
         <small v-show="errors.has('senha')" class="help text-danger">{{ errors.first('senha') }}</small>
        <small class="help text_color">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </small>
      </div>
      </div>

      <!--photo-->
      <div class="form-group form-group-w-btn">
        <div class="input-group">
          <input
            id="input-w-btn"
            required="required">
          <label for="input-w-btn" class="control-label">
            EDITE A FOTO DO SEU PROFILE
          </label>
          <i class="bar"></i>
        </div>
        <div class="btn btn-micro btn-primary">UPLOAD</div></div>
    </fieldset>
    <button
      @click="salvar()"
      type="button"
      class="btn btn-success pull-right">
      Salvar
    </button>
  </div>
</template>

<script>
  import Usuario from '../../../model/User'
  import http from 'axios'
  export default {
    name: 'user-form',
    data () {
      return {
        user: new Usuario()
      }
    },
    created () {
      this.user = Usuario.BUILD_FORM(this.user)
    },
    methods: {
      salvar () {
        const email = 'admin@admin.com'
        const password = '123456'
        console.log('email', btoa(email))
        console.log('password', btoa(password))

        var credentials = btoa(email + ':' + password)
        var BasicAuth = 'Basic ' + credentials
        http.post('http://localhost:8084/alg-judge/rest/usuario/admin', {
          headers: {'Authorization': +BasicAuth}
        }).then((response) => {
          console.log('Authenticated')
        })
          .catch((error) => {
            console.log('Error on Authentication', error)
          })
        /*
        http.post('http://localhost:8084/alg-judge/rest/usuario/admin',
          {auth: {username: btoa(email), email: btoa(password)}},
          {headers: {'X-Requested-With': 'XMLHttpRequest'}}
        ).then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
        })
        */
      }
    }
  }
</script>

<style scoped>
  .text_password {
    letter-spacing: 15px;
  }
  .text_color {
    color: white;
  }
</style>
