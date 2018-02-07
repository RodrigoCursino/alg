class Problema {
  static BUILD_FORM (problema) {
    const data = {
      id: problema.id ? problema.id : 0,
      titulo: problema.titulo ? problema.titulo : null,
      descricao: problema.descricao ? problema.descricao : null,
      ativo: problema.ativo ? problema.ativo : true,
      descricaoEntrada: problema.descricaoEntrada ? problema.descricaoEntrada : null,
      descricaoSaida: problema.descricaoSaida ? problema.descricaoSaida : null
    }
    return data
  };
  static BUILD_PROBLEMA () {
    const data = {
      id: 1,
      titulo: 'O Maior',
      descricao: '<p>Faça um programa que leia dois valores inteiros e imprima o maior entre eles.</p>',
      ativo: true,
      descricaoEntrada: '<p>A entrada consiste na leitura de dois valores inteiros.</p>',
      descricaoSaida: '<p>Seu programa deve escrever na tela o maior valor entre os dois valores lidos conforme os exemplos fornecidos.</p>'
    }
    return data
  };
}

export default Problema
