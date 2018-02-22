<template>
  <div class="users-members-tab dashboard-tab">
    <div class="row">
      {{userLogado}}
      <div class="col-md-3 d-flex justify-content-center align-items-center">
        <vuestic-profile-card :name="user.nome" :location="'Coxim, MS'" photoSource="http://i.imgur.com/NLrdqsk.png"
                              :social="{twitter: 'twitter.com', facebook: 'facebook.com',
                                  instagram: 'instagram.com'}">
        </vuestic-profile-card>
      </div>
      <div class="col-md-9 d-flex my_dashboard">
         <user-form></user-form>
      </div>
    </div>
  </div>
</template>

<script>
  import UserForm from './user-form/UserForm'
  export default {
    name: 'profile',
    components: {
      UserForm
    },
    computed: {
      userLogado () {
        this.user = this.$store.state.userState.user
      }
    },
    data () {
      return {
        user: {}
      }
    }
  }
</script>

<style scoped>
  .my_dashboard{
    padding: 50px;
    margin-top: 18px;
    background-color: white;
  }
</style>
