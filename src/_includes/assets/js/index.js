import sal from 'sal.js'
import menu from './modules/menu.js'
import accordion from './modules/accordion.js'
import scroll from './modules/scroll.js'

window.addEventListener('DOMContentLoaded', () => {
  menu()

  sal({
    threshold: 0.01,
    rootMargin: '0% 0px -5% 0px',
  })

  accordion()
  scroll()
})
