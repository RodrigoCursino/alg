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
}

export default Problema
