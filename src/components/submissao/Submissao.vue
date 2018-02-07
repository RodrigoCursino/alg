<template>
  <div>
    <div class="users-members-tab dashboard-tab">
      <div class="row">
        <div class="col-md-3 d-flex justify-content-center align-items-center">
          <vuestic-profile-card :name="'Veronique Lee'" :location="'Coxim, MS'"
                                photoSource="http://i.imgur.com/NLrdqsk.png"
                                :social="{}">
          </vuestic-profile-card>
        </div>
        <div class="col-md-9 my_background">
          <div class="row">
            <div class="col-md-9 col-lg-9">
               <h5> <i class="fa fa-arrow-circle-left"> </i> {{titulo()}}</h5>
            </div>
            <div class="col-md-3 col-lg-3">
                <i v-if="view" @mouseover="mouseOver" @mouseout="mouseOut" class="fa fa-eye pull-right" style="font-size: 1.5em"></i>
                <span v-else-if="view === false && problemaView === false" @mouseout="mouseOut" @click="problemaViewDiv" class="pull-right">Visualizar Problema</span>
                <i v-else-if="problemaView" @click="problemaViewYes" class="fa fa-eye-slash desabilitado pull-right" style="font-size: 1.5em"></i>
            </div>
          </div>
          <hr>
          <!-- problema View -->
          <div v-if="problemaView && submissao.problema != null" class="row">
            <div class="col-md-12 col-lg-12">
              <h6>Descrição</h6>
              <div class="my_margin" v-html="submissao.problema.descricao"></div>
              <h6>Entrada</h6>
              <div class="my_margin" v-html="submissao.problema.descricaoEntrada"></div>
              <h6>Saída</h6>
              <div class="my_margin" v-html="submissao.problema.descricaoSaida"></div>
            </div>
          </div>
          <div v-if="problemaView && submissao.problema === null" class="row">
            <div class="col-md-12 col-lg-12">
              <problema-list @problemaParaSubmissao="submissaoProblema"></problema-list>
            </div>
          </div>
          <!-- Submeter -->
          <div class="row" v-else>
            <div class="col-md-12 col-lg-12">
              <textarea v-model="submissao.codigoFonte" class="submissao_area" wrap="off" cols="30" rows="5"></textarea>
              <button @click="submeter(submissao)" class="btn btn-success pull-right">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import Submissao from '../../model/Submissao'
  import SubmissaoDao from '../../dao/SubmissaoDao'
  import swal from 'sweetalert'
  import User from '../../model/User'
  import http from 'axios'
  import ProblemaList from './problema-list/problema-list'
  export default {
    name: 'submissao',
    components: {
      ProblemaList,
      DashboardInfoWidgets
    },
    data () {
      return {
        view: true,
        problemaView: false,
        submissao: new Submissao()
      }
    },
    created () {
      this.submissao = new Submissao.BUILD_FORM(this.submissao)
    },
    computed: {
      dateConverter: (value) => {
        let dateString = window.moment.unix(value / 1000).format('MM/DD/YYYY')
        return dateString
      }
    },
    methods: {
      mouseOver () {
        this.view = false
      },
      titulo () {
        if (this.submissao.problema === null) {
          return 'Listagem de Problemas'
        } else {
          return this.submissao.problema.titulo
        }
      },
      mouseOut () {
        this.view = true
      },
      problemaViewDiv () {
        this.problemaView = true
      },
      problemaViewYes () {
        this.problemaView = false
      },
      submissaoProblema (problema) {
        this.submissao.problema = problema
      },
      submeter (submissao) {
        submissao.usuario = User.BUILD_USER()
        this.submissao = SubmissaoDao.submitForm(submissao)
        http.post('http://localhost:8084/alg-judge/rest/submissao', this.submissao).then((response) => {
          console.log('Submetido', response)
          let icon
          if (response.data.msg === 'ACEITO') {
            icon = 'success'
          } else {
            response.data.msg = response.data.msg.replace('_', ' ')
            icon = 'warning'
          }
          swal('Código Enviado', response.data.msg, icon)
        })
      }
    }
  }
</script>

<style scoped>
  hr {
    color: #4ae387;
    border: solid;
    height: 1px;
    border-radius: 50px 50px 50px 50px;
    margin: 5px 0px 20px 0px;
  }
  .my_margin {
    margin-bottom: 15px;
  }

  i:hover {
    color: #4ae387;
  }

  .desabilitado {
    color: #77797a;
  }
</style>
