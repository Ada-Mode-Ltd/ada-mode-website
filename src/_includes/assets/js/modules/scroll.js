import throttle from 'lodash.throttle'

let y
let direction = 'down'

const onScroll = () => {
  if (window.scrollY > y) {
    direction = 'down'
  } else if (window.scrollY < y) {
    direction = 'up'
  }

  y = window.scrollY

  if (window.scrollY > 200 && direction === 'down') {
    document.body.classList.add('is-scrolling')
  } else {
    document.body.classList.remove('is-scrolling')
  }

  document.body.style.setProperty('--scroll', window.scrollY)
}

const scroll = () => {
  window.addEventListener('scroll', throttle(onScroll, 30))
}

export default scroll
