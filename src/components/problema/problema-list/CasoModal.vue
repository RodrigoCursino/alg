<template>
  <transition name="modal" :duration="duration">
    <div v-show="show" class="modal-container">
      <div class="modal" @click.self="clickMask">
        <div class="modal-dialog" :class="modalClass">
          <div class="modal-content">
            <!--Header-->
            <div class="modal-header">
              <slot name="header">
                <div class="modal-title">
                  <slot name="title"></slot>
                </div>
              </slot>
            </div>
            <!--Container-->
            <div class="modal-body">

              {{verificarCasos}}

              <caso-de-teste-list @editCaso="editarCasoDeTeste" :casos="casos"></caso-de-teste-list>

              <fieldset class="my_fieldset my_margin">
                <div class="form-group">
                  <div class="input-group">
                    <input v-model="casoDeTeste.saida"
                           v-validate="'required'"
                           :class="{'input': true, 'is-danger': errors.has('saida') }"
                           id="saida"
                           name="saida" required="required">
                    <label for="saida" class="control-label">DIGITE UMA SAÍDA PARA O CASO DE TESTE</label>
                    <i class="bar"></i>
                    <small v-show="errors.has('saida')" class="help text-danger">{{ errors.first('saida') }}</small>
                  </div>
                </div>

                <div class="form-group form-group-w-btn">
                  <div class="input-group">
                    <input id="input-w-btn-round"
                           v-model="caso"
                           required/>
                    <label class="control-label" for="input-w-btn-round">
                      DIGITE UMA ENTRADA PARA O CASO DE TESTE
                    </label>
                    <i class="bar"></i>
                  </div>
                  <div @click="addEntrada(caso)" class="btn btn-primary btn-with-icon btn-micro rounded-icon">
                    <div class="btn-with-icon-content">
                      <i aria-hidden="true"
                         class="fa fa-plus"
                         style="font-size: 26px; text-align: center;">
                      </i>
                    </div>
                  </div>
                </div>

                <div v-if="entradas.length > 0" class="text-center my_margin">
                  <span class="text-danger my_danger my_margin">CLICK PARA DELETAR ALGUMA ENTRADA</span> <br>
                  <b-button-group style="margin-top: 10px">
                    <b-button @click="delEntrada(e)" v-for="e in entradas" :key="e">{{e}}</b-button>
                  </b-button-group>
                </div>

                <div class="text-center">
                  <vuestic-switch v-model="casoDeTeste.exemplo">
                    <span slot="trueTitle">COM EXEMPLO</span>
                    <span slot="falseTitle">SEM EXEMPLO</span>
                  </vuestic-switch>
                </div>

              </fieldset>

              <button  @click="salvar" class="btn btn-primary btn-micro text-center">
                <div class="btn-with-icon-content">
                  <span aria-hidden="true" class="fa fa-plus" style="font-size: 12px;"></span>
                  adicionar
                </div>
              </button>

            </div>
            <!--Footer-->
            <div class="modal-footer">
              <slot name="footer">
                <button type="button" :disabled="entradas.length = 0" :class="okClass" @click="ok">{{okText}}</button>
                <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop"></div>
    </div>
  </transition>
</template>

<script>
  import http from 'axios'
  import CasoDeTeste from '../../../model/CasoDeTeste'
  import CasoDeTesteDao from '../../../dao/CasoDeTesteDao'
  import ProblemaDao from '../../../dao/ProblemaDao'
  import Problema from '../../../model/Problema'
  import CasoDeTesteList from '../problema-form/form-elements/caso-de-teste-list'

  export default {
    name: 'caso-modal',
    props: {
      transition: {
        type: String,
        default: 'modal'
      },
      problemaId: {required: true},
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      force: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String,
        default: 'CONFIRM'
      },
      cancelText: {
        type: String,
        default: 'CANCEL'
      },
      okClass: {
        type: String,
        default: 'btn btn-primary'
      },
      cancelClass: {
        type: String,
        default: 'btn btn-secondary'
      }
    },
    components: {
      CasoDeTesteList
    },
    data () {
      return {
        show: false,
        casos: [],
        caso: '',
        entradas: [],
        casoDeTeste: new CasoDeTeste(),
        problema: new Problema(),
        duration: 500
      }
    },
    computed: {
      modalClass () {
        return {
          'modal-lg': this.large,
          'modal-sm': this.small
        }
      },
      verificarCasos () {
        if (this.show) {
          this.casoDeTeste = CasoDeTeste.BUILD_FORM(this.casoDeTeste)
          this.getProblema(this.problemaId)
          this.getCasos()
        }
      }
    },
    created () {
      if (this.show) {
        document.body.className += ' modal-open'
      }
    },
    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },
    watch: {
      show (value) {
        if (value) {
          document.body.className += ' modal-open'
        } else {
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration)
        }
      }
    },
    methods: {
      ok () {
        this.casoDeTeste = CasoDeTesteDao.submitForm(this.casoDeTeste)
        this.salvar()
        this.cancel()
      },
      cancel () {
        this.$emit('cancel')
        this.show = false
      },
      clickMask () {
        if (!this.force) {
          this.cancel()
        }
      },
      open () {
        this.show = true
      },
      salvar () {
        this.casoDeTeste.entrada = ''

        for (let entrada in this.entradas) {
          if (entrada < this.entradas.length - 1) {
            this.casoDeTeste.entrada += this.entradas[entrada] + '\n'
          } else {
            this.casoDeTeste.entrada += this.entradas[entrada]
          }
        }
        this.casoDeTeste.problema = ProblemaDao.SUBMIT_FORM(this.casoDeTeste.problema)
        this.salvarCasoDeTeste(this.casoDeTeste)
      },
      salvarCasoDeTeste (casoDeTeste) {
        const data = CasoDeTesteDao.submitForm(casoDeTeste)
        debugger
        if (data.id === 0) {
          http.post('http://localhost:8084/alg-judge/rest/casodeteste', data).then(
            response => {
              casoDeTeste.id = response.data.data.id
              this.casos.push(casoDeTeste)
              this.clean()
            }
          )
        } else {
          http.put('http://localhost:8084/alg-judge/rest/casodeteste', data).then(
            response => {
              console.log('Casos De Teste Atualizado', response.data.msg)
              this.delCasos(casoDeTeste)
              this.casos.push(casoDeTeste)
              this.clean()
            }
          )
        }
      },
      editarCasoDeTeste (caso) {
        this.casoDeTeste = caso
        this.getEntradas(this.casoDeTeste.entrada)
      },
      getEntradas (entrada) {
        this.entradas = entrada.split('\n')
      },
      addEntrada (entrada) {
        this.entradas.push(entrada)
        this.caso = ''
      },
      delEntrada (entrada) {
        this.entradas.splice(this.findIndex(entrada), 1)
      },
      findIndex (index) {
        return this.entradas.findIndex((_entrada) => {
          return _entrada === index
        })
      },
      clean () {
        this.entradas = []
        this.casoDeTeste = new CasoDeTeste()
        this.casoDeTeste.id = 0
        this.casoDeTeste = CasoDeTeste.BUILD_FORM(this.casoDeTeste)
        this.casoDeTeste.problema = this.problema
        this.getCasos()
      },
      getProblema (id) {
        http.get('http://localhost:8084/alg-judge/rest/problema/' + id).then(response => {
          this.problema = response.data.data
          this.problema = ProblemaDao.SUBMIT_FORM(this.problema)
          this.casoDeTeste.problema = this.problema
          console.log('Get Problema', response)
        })
      },
      getCasos () {
        http.get('http://localhost:8084/alg-judge/rest/casodeteste/listarcasos/' + this.problemaId)
          .then(response => {
            this.casos = response.data.data
            console.log('Casos De Teste', response.data.data)
          })
      },
      delCasos (caso) {
        this.casos.splice(this.findIndexCasos(caso), 1)
      },
      findIndexCasos (index) {
        return this.casos.findIndex((_caso) => {
          return _caso.id === index.id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";

  // For Transitioning
  .modal {
    display: block;
  }

  .modal-dialog, .modal-backdrop {
    transition: all .5s ease;
  }

  .modal-enter .modal-dialog, .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop, .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

  //Modal styles

  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }

  .modal-content {
    border-radius: $modal-content-border-radius;
  }

  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(#{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom});
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom $modal-footer-btns-margin-x;
    }
  }

  .my_fieldset {
    width: 100%;
  }

  .my_margin {
    margin-bottom: 25px;
  }

  .my_danger {
    font-weight: bold;
    font-size: 0.8em;
  }

  .modal-dialog {
    box-shadow: $modal-content-box-shadow-sm-up;
  }
</style>
