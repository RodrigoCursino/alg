<template>
  <div>
    <painel-submissao @voltarParaListagem="voltar" @vizualizarProblema="showProblema" :problema="problema" v-if="painel"></painel-submissao>
    <view-problema @voltarParaListagem="voltar" v-else @showPanel="mostrarPainel" :problema="problema"></view-problema>
  </div>
</template>

<script>
    import ViewProblema from './viewProblema'
    import PainelSubmissao from './painelSubmissao'
    export default {
      name: 'submissao',
      components: {
        ViewProblema,
        PainelSubmissao
      },
      props: {
        problema: {required: true}
      },
      data () {
        return {
          painel: false
        }
      },
      methods: {
        repleceEntrada (entrada) {
          console.log(entrada.replace(/\n/g, '<br>'))
          return entrada.replace(/\n/g, '<br>')
        },
        mostrarPainel () {
          this.painel = true
        },
        showProblema () {
          this.painel = false
        },
        voltar () {
          this.$emit('voltar')
        }
      }
    }
</script>

<style scoped>

</style>
