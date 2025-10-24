import Page from '..'
import Values from '../../animations/values'
// import Accordion from '@pixeto/accordion'
// import Gallery from '../../animations/gallery'

export default class Home extends Page {
  homeLayer: HTMLElement | undefined
  constructor(options: { element: HTMLElement }) {
    super(options)
    this.lenis = super.getLenis()
    this.create()

    this.addEventListeners()
    this.onResize()
  }

  create() {
    super.create()
    // Initialize the accordion
    super.show()

    // new Values({ element: document.querySelector('.home_value-trigger_wrapper'), lenis: this.lenis })
    new Values({ element: document.querySelectorAll('.home_value-content_block'), lenis: this.lenis })

    this.homeLayer = document.querySelector('.home_hero-layer_1') as HTMLElement
  }

  onResize() {
    super.onResize()

    const homeLayerHeight = this.homeLayer?.offsetHeight || 0
    if (this.homeLayer) {
      console.log('resize home page', homeLayerHeight)
      this.homeLayer.style.top = `-${homeLayerHeight - window.innerHeight}px`
    }
  }

  destroy(): void {
    super.destroy()
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }
}
