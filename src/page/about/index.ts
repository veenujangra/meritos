import Page from '..'
import Slider from './slider'
// import Values from '../../animations/values'
// import Accordion from '@pixeto/accordion'
// import Gallery from '../../animations/gallery'

export default class About extends Page {
  constructor(options: { element: HTMLElement }) {
    super(options)
    this.lenis = super.getLenis()
    this.create()
  }

  create() {
    super.create()
    // Initialize the accordion
    super.show()

    // Slider
    if (window.innerWidth > 768) {
      new Slider({ element: document.querySelector('.about_perk-wrapper') as HTMLElement })
    }
  }

  onResize() {
    super.onResize()
  }

  destroy(): void {
    super.destroy()
  }
}
