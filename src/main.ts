import About from './page/about'
import Home from './page/home'
import './style.css'

class Meritos {
  home: Home | undefined
  about: About | undefined
  constructor() {
    this.createPage()
  }

  createPage() {
    if (document.querySelector('[data-page="home"]')) {
      this.home = new Home({
        element: document.querySelector('[data-page="home"]') as HTMLElement,
      })
    }
    if (document.querySelector('[data-page="about"]')) {
      this.about = new About({
        element: document.querySelector('[data-page="about"]') as HTMLElement,
      })
    }
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {}
}

new Meritos()
