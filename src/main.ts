import About from './page/about'
import Home from './page/home'
import Page from './page'
import './style.css'

class Meritos {
  home: Home | undefined
  about: About | undefined
  page: Page | undefined
  constructor() {
    this.createPage()
  }

  createPage() {
    if (document.querySelector('[data-page="home"]')) {
      this.home = new Home({
        element: document.querySelector('[data-page="home"]') as HTMLElement,
      })
    } else if (document.querySelector('[data-page="about"]')) {
      this.about = new About({
        element: document.querySelector('[data-page="about"]') as HTMLElement,
      })
    } else {
      this.page = new Page({ element: document.querySelector('[data-page]') as HTMLElement })
      this.page.create()
      this.page.show()
    }
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {}
}

new Meritos()
