import Page from '..'
import Values from '../../animations/values'
// import Accordion from '@pixeto/accordion'
// import Gallery from '../../animations/gallery'

export default class Home extends Page {
  constructor(options: { element: HTMLElement }) {
    super(options)
    this.lenis = super.getLenis()
    this.create()
  }

  create() {
    super.create()
    // Initialize the accordion
    super.show()

    if (window.innerWidth < 768) return
    new Values({ element: document.querySelector('.home_value-trigger_wrapper') })
  }

  onResize() {
    super.onResize()
  }

  destroy(): void {
    super.destroy()
  }
}
