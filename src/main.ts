import Home from './page/home'
import './style.css'

class Meritos {
  home: Home | undefined

  constructor() {
    this.createPage()
  }

  createPage() {
    this.home = new Home({
      element: document.querySelector('[data-page="home"]') as HTMLElement,
    })
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {}
}

new Meritos()
