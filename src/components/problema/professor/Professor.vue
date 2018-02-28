<template>
  <div>
    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs :names="[$t('Listar Problemas'), $t('Cadastrar Problema')]" ref="tabs">
        <div :slot="$t('Listar Problemas')">
          <problema-list></problema-list>
        </div>
        <div :slot="$t('Cadastrar Problema')">
          <problema-form></problema-form>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

  </div>
</template>

<script>
  import ProblemaForm from '../problema-form/ProblemaForm'
  import FormElementsProblema from '../problema-form/form-elements/form-elements-problema'
  import ProblemaList from '../problema-list/ProblemaList'
  export default {
    name: 'professor',
    components: {
      ProblemaForm,
      ProblemaList,
      FormElementsProblema
    }
  }
</script>

<style scoped>

</style>
