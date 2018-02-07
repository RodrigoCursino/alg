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

  static BUILD_USER () {
    const data = {
      id: 1,
      nome: 'admin',
      senha: '123456',
      email: 'admin@admin.com',
      ativo: true,
      papel: 'ALUNO'
    }
    return data
  }
}
export default User
