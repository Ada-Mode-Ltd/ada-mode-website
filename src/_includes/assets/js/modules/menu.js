const menu = () => {
  const el = document.querySelector('[data-component="menu"]')
  const menuItems = [...el.querySelectorAll('[data-menu-link]')]
  const menuButton = el.querySelector('[data-menu-button="main"]')
  const dropdownButtons = [...el.querySelectorAll('[data-dropdown-button]')]
  const dropdownContentAreas = [...el.querySelectorAll('[data-menu-dropdown]')]
  const content = el.querySelector('[data-menu-content]')
  const header = document.querySelector('.navbar')

  const mq = window.matchMedia('(min-width: 992px)')

  const onClick = () => {
    if (content.hidden) {
      content.hidden = false

      setTimeout(() => {
        content.classList.add('is-visible')
        content.style.setProperty('--headerHeight', `${header.clientHeight}px`)
      }, 10)
    } else {
      content.classList.remove('is-visible')
      setTimeout(() => (content.hidden = true), 300)
    }
  }

  const onMenuClick = (e) => {
    const dropdownTitle = e.target.dataset.dropdownButton

    dropdownContentAreas.forEach((el) => {
      if (!dropdownTitle) {
        el.classList.remove('is-visible')
        return
      }

      const isOpen = el.classList.contains('is-visible')

      if (el.id === `${dropdownTitle}` && !isOpen) {
        el.classList.add('is-visible')
      } else {
        el.classList.remove('is-visible')
      }
    })
  }

  const closeAll = () => {
    dropdownContentAreas.forEach((el) => {
      el.classList.remove('is-visible')
    })
  }

  const onChange = (query) => {
    content.classList.remove('is-visible')

    if (query.matches) {
      content.hidden = false
      closeAll()
      el.addEventListener('click', onMenuClick)
    } else {
      content.hidden = true
      el.removeEventListener('click', onMenuClick)
    }
  }

  const init = () => {
    if (mq.matches) {
      content.hidden = false

      el.addEventListener('click', onMenuClick)
    }
  }

  init()
  menuButton.addEventListener('click', onClick)
  mq.addEventListener('change', onChange)
}

export default menu
