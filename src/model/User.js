class User {
  static BUILD_FORM (user) {
    const data = {
      nome: user.nome ? user.nome : null,
      email: user.email ? user.email : null,
      senha: user.senha ? user.senha : null
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
