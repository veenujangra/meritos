export default class Animation {
  protected element: HTMLElement
  private observerOptions: IntersectionObserverInit = {}
  private observer: IntersectionObserver = new IntersectionObserver(() => {})
  private onResize: () => void = () => {}

  constructor(options: { element: HTMLElement }) {
    this.element = options.element

    this.createObserver()
    this.addEventListener()
  }

  createObserver() {
    this.observerOptions = {
      rootMargin: this.element.getAttribute('data-root-margin') || '0px 0px -20% 0px',
      threshold: parseFloat(this.element.getAttribute('data-threshold') || '0'),
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.element.hasAttribute('data-allow-repeat') === false) {
            this.animateIn()
            this.observer.unobserve(this.element)
          } else {
            this.animateIn()
          }
        } else {
          if (this.element.hasAttribute('data-allow-repeat') === true) {
            this.animateOut()
          }
        }
      })
    }, this.observerOptions)

    this.observer.observe(this.element)
  }

  animateIn() {}
  animateOut() {}

  addEventListener() {
    this.onResize = this.onResize.bind(this)
    window.addEventListener('resize', this.onResize)
  }
}
