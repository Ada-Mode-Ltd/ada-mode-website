const onClick = (e, el) => {
  const id = e.target.dataset.btn

  if (!id) return

  const parent = e.target.closest('[data-item]')
  const content = el.querySelector(`#${id}`)

  if (!content) return

  const innerContent = content.querySelector('[data-inner-content]')

  if (content.hidden) {
    content.hidden = false
    content.style.height = `${innerContent.clientHeight}px`
    parent.classList.add('is-open')
  } else {
    content.style.height = '0px'
    parent.classList.remove('is-open')

    setTimeout(() => {
      content.hidden = true
    }, 200)
  }
}

const initAccordion = (el) => {
  const buttons = [...el.querySelectorAll('[data-btn]')]
  const contentAreas = [...el.querySelectorAll('[data-content]')]

  contentAreas.forEach((el) => (el.hidden = true))

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => onClick(e, el))
  })
}

const accordion = () => {
  const accordions = [
    ...document.querySelectorAll('[data-component="accordion"]'),
  ]

  accordions.forEach(initAccordion)
}

export default accordion
