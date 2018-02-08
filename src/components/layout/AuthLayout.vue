<template>
  <div>
    <div class="content">
      <div class="title">
        <h1>ALG JUDGE</h1>
      </div>
      <div class="form">
        <div class="form-group">
          <div class="input-group">
            <input v-model="user.nome" id="nome" required/>
            <label class="control-label" for="nome">DIGITE SEU EMAIL</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="email" v-model="user.email" id="email" required/>
            <label class="control-label" for="email">DIGITE SEU EMAIL</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input v-model="user.senha" type="password" id="senha" required/>
            <label class="control-label" for="senha">DIGITE SUA SENHA</label><i class="bar"></i>
          </div>
        </div>
        <button @click="login()" class="btn btn-success pull-right">ENTRAR</button>
        <button @click="singUP()" class="btn btn-success pull-right">Sign</button>
      </div>
    </div>
  </div>
</template>

<script>
  import User from '../../model/User'
  import UserDao from '../../dao/UserDao'

  export default {
    name: 'AuthLayout',
    data () {
      return {
        user: new User()
      }
    },
    created () {
      this.user = User.BUILD_FORM(this.user)
    },
    methods: {
      login () {
        this.user = UserDao.submitForm(this.user)
        this.$emit('logado', this.user)
      },
      singUP () {
        this.$emit('cadastro', this.user)
      }
    }
  }
</script>

<style scoped lang="scss">
    .bg {
      background-color: #128000;
      color: #4ae387;
    }
    .title {
      z-index: 999;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .form {
      width: 481px;
      background: white;
      padding: 50px;
      border-radius: 5px 5px 5px 5px;
    }
    input {
      width: 100%;
    }
</style>
