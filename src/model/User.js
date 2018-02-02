class User {
  static BUILD_FORM (user) {
    const data = {
      id: user.id ? user.id : 0,
      nome: user.nome ? user.nome : null,
      senha: user.senha ? user.senha : null,
      email: user.email ? user.email : null,
      ativo: user.ativo ? user.ativo : true,
      papel: user.papel ? user.papel : null
    }
    return data
  }
}
export default User
