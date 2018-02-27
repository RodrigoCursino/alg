<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-md-6">
        <div class="chart-container">
          <vuestic-chart :data="chart" type="donut"></vuestic-chart>
        </div>
      </div>
      <div class="col-md-6">
        <submissao-list :mostrar="false" :list="dados"></submissao-list>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'vuex-store'
  import SubmissaoList from '../../problema/aluno/submissao/listSubmissao'

  export default {
    name: 'data-visualisation-tab',
    props: {
      dados: {required: true},
      aceito: {required: true, default: 0},
      sintax: {required: true, default: 0},
      erro: {required: true, default: 0}
    },
    components: {
      SubmissaoList
    },
    data () {
      return {
        chart: {
          labels: ['Erros', 'Erro de Sintax', 'Aceitos'],
          datasets: [{
            label: 'Population (millions)',
            backgroundColor: [store.getters.palette.danger, store.getters.palette.warning, store.getters.palette.primary],
            data: [2, 2, 2]
          }]
        }
      }
    },
    computed: {
    },
    methods: {
      atualizarGrafico () {
        this.chart.datasets[0].data = [this.erro, this.sintax, this.aceito]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";

  .chart-container {
    padding: 0 2rem;
    height: 24rem;
  }


</style>
