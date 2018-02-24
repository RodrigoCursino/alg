<template>
   <div>
     <table class="table table-striped text-center">
       <thead>
        <tr>
          <td></td>
        </tr>
       </thead>
       <tbody>
        <tr v-for="item in list">
          <td>{{item}}</td>
        </tr>
       </tbody>
     </table>
   </div>
</template>

<script>
    export default {
      name: 'list-submissao',
      props: {
        list: {required: true}
      }
    }
</script>

<style scoped>

</style>
