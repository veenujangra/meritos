import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Slider from './slider'
import type Lenis from 'lenis'

export default class Values {
  wrapper: HTMLElement | null
  triggers: HTMLElement[]
  lenis: Lenis | null
  tl: gsap.core.Timeline | undefined
  elementsChildren: {
    title: HTMLElement | null
    number: HTMLElement | null
    text: HTMLElement | null
    graph: HTMLElement | null
    images: NodeListOf<HTMLElement>
    imageWrapper: HTMLElement | null
    graphHighlight: HTMLElement | null
  }[] = []
  elements: NodeListOf<HTMLElement>
  constructor(options = { element: null as HTMLElement | null, lenis: null as unknown as Lenis }) {
    this.wrapper = options.element
    this.lenis = options.lenis
    this.triggers = this.wrapper
      ? (Array.from(this.wrapper.querySelectorAll('.home_value-trigger')) as HTMLElement[])
      : []

    this.elements = document.querySelectorAll('[data-value-wrapper]')

    if (window.innerWidth > 768) {
      // console.log('create scroll trigger')
      this.create()
    } else {
      // console.log('create slider')
      this.createSlider()
    }
  }

  create() {
    gsap.registerPlugin(ScrollTrigger)

    const progressTrack = document.querySelector('.home_value-nav_track')
    const progressItems = progressTrack!.querySelectorAll('.home_value-nav_item')
    const trackFill = progressTrack!.querySelector('.home_value-nav_track-fill')

    progressItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.lenis?.scrollTo(this.elements[index], { offset: -300 })
      })
    })

    // let debounceTimer: number | null = null
    this.elements.forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        onEnter: () => {
          el.classList.add('active')
          progressItems[index].classList.add('active')
          const progress = (index / (this.elements.length - 1)) * 100
          gsap.to(trackFill, { height: `${progress}%`, duration: 0.3 })
        },
        onLeaveBack: () => {
          el.classList.remove('active')
          // console.log('leave back', index)
          progressItems[index].classList.remove('active')
          let newIndex = index - 1
          const progress = (newIndex / (this.elements.length - 1)) * 100
          gsap.to(trackFill, { height: `${progress}%`, duration: 0.3 })
        },
      })
    })
  }

  createSlider() {
    new Slider({ element: document.querySelector('.home_value-block') as HTMLElement })
  }
}
