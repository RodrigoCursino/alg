import lazyLoading from './lazyLoading'

export default {
  name: 'Submissao',
  path: '/submissao',
  component: lazyLoading('submissao/Submissao'),
  meta: {
    default: true,
    title: 'Submissões',
    iconClass: 'fa fa-code'
  }
}
