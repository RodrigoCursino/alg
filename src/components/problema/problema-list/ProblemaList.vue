<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="container">
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="problemas"
              :list="problemas"
              :per="pageTotal"
            >
            <table class="table text-center table-striped first-td-padding">
              <thead>
              <tr>
                <td>Título</td>
                <td>Edit</td>
                <td>Delete</td>
                <td align="right">Adicionar um Caso de Teste</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="problema in paginated('problemas')">
                <td>{{problema.titulo}}</td>
                <td>
                    <button @click="editProblema(problema)" class="btn btn-info btn-micro">
                      <div class="btn-with-icon-content">
                        <span aria-hidden="true" class="fa fa-edit" style="font-size: 12px;"></span>
                      </div>
                    </button>
                </td>
                <td>
                  <button @click="deleteProblema(problema)" class="btn btn-danger btn-micro">
                    <div class="btn-with-icon-content">
                      <span aria-hidden="true" class="fa fa-trash" style="font-size: 12px;"></span>
                    </div>
                  </button>
                </td>
                <td align="right" style="text-align:right">
                  <button @click="addCasoDeTeste(problema.id)" class="btn btn-primary btn-micro">
                    <div class="btn-with-icon-content">
                      <span aria-hidden="true" class="fa fa-plus" style="font-size: 12px;"></span>
                      adicionar
                    </div>
                  </button>
                </td>
                <td></td>
              </tr>
              </tbody>
            </table>
            </paginate>
            <div role="group" aria-label="First group" class="btn-group pull-right">
              <button @click="anterior()" :disabled="pageA" type="button" class="btn btn-info">Anterior</button>
              <button @click="proximo()" :disabled="pageP" type="button" class="btn btn-info">Próximo</button>
            </div>
          </div>
            <problema-modal
              :show.sync="show"
              :problema="problema"
              v-bind:large="true"
              ref="largeModal"
              :okText="'modal.confirm' | translate" :cancelText="'modal.cancel' | translate"
            >
              <div slot="title">Edit Problema</div>
              <div>

              </div>
            </problema-modal>
            <caso-modal
              :show.sync="show"
              :problema-id="problemaId"
              v-bind:large="true"
              ref="casoModal"
              :okText="'modal.confirm' | translate" :cancelText="'modal.cancel' | translate"
            >
            <div slot="title">Adicione um novo Caso de Teste</div>
            <div>

            </div>
          </caso-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import http from 'axios'
  import swal from 'sweetalert'
  import ProblemaModal from '../ProblemaModal'
  import CasoModal from './CasoModal'
  import ProblemaCadastro from '../problema-form/form-elements/problema-cadastro'

  export default {
    name: 'problema-list',
    components: {
      ProblemaModal,
      CasoModal,
      ProblemaCadastro
    },
    data () {
      return {
        problemas: [],
        paginate: ['problemas'],
        page: 1,
        pageTotal: 5,
        pageP: false,
        pageA: true,
        total: 0,
        problema: '',
        problemaId: '',
        show: false
      }
    },

    created () {
      this.getAll()
    },

    methods: {
      getAll () {
        http.get('http://localhost:8084/alg-judge/rest/problema/list/10'
        ).then(response => {
          this.problemas = response.data
          this.quantidadeDePag()
        })
      },

      deleteProblema (problema) {
        swal({
          title: 'Você tem certeza disto?',
          text: 'O Problema ' + problema.titulo.toUpperCase() + ' será deletado, clique em ok para executar esta ação!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              this.delete(problema.id)
              swal('O Problema ' + problema.titulo + ', foi deletado!', {
                icon: 'success'
              })
            } else {
              swal('O Problema ' + problema.titulo + ', esta seguro em nossos arquivos!')
            }
          })
      },

      editProblema (problema) {
        this.problema = problema
        console.log('Problema Edit', this.problema)
        this.$refs.largeModal.open()
      },

      addCasoDeTeste (id) {
        this.problemaId = id
        this.$refs.casoModal.open()
      },

      delete (id) {
        http.put('http://localhost:8084/alg-judge/rest/problema/delete/' + id).then(response => {
          this.getAll()
        })
      },
      proximo () {
        if (this.page <= this.total) {
          this.page++
          this.pageA = false
          this.$refs.paginator.goToPage(this.page)
        } else {
          this.pageP = true
        }
      },
      anterior () {
        if (this.page > 1) {
          this.page--
          this.pageP = false
          this.$refs.paginator.goToPage(this.page)
        } else {
          this.pageA = true
        }
      },
      quantidadeDePag () {
        this.total = (this.problemas.length) / this.pageTotal
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
