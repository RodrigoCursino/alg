<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-12">
        <vuestic-tabs :names="[$t('Todos Problemas'),$t('Novo Problema')]" ref="tabs">
          <div :slot="$t('Todos Problemas')">
            <problema-list></problema-list>
          </div>
          <div :slot="$t('Novo Problema')">
            <problema-form></problema-form>
          </div>
        </vuestic-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import ProblemaForm from './problema-form/ProblemaForm'
  import ProblemaList from './problema-list/ProblemaList'

  export default {
    name: 'problema',
    components: {
      ProblemaForm,
      ProblemaList
    },
    data () {
      return {
        show: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
