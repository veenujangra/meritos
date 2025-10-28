import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
// import Slider from './slider'
import type Lenis from 'lenis'

export default class Values {
  wrappers: NodeListOf<HTMLElement> | null
  lenis: Lenis | null
  constructor(options = { element: null as unknown as NodeListOf<HTMLElement>, lenis: null as unknown as Lenis }) {
    this.wrappers = options.element
    this.lenis = options.lenis

    if (window.innerWidth > 768) {
      this.init()
    }
  }
  init() {
    gsap.registerPlugin(ScrollTrigger)

    this.wrappers?.forEach((wrapper, index) => {
      if (!wrapper) return

      const progressTrack = document.querySelector('.home_value-nav_track')
      const progressItems = progressTrack!.querySelectorAll('.home_value-nav_item')
      const trackFill = progressTrack!.querySelector('.home_value-nav_track-fill')

      const card = wrapper.querySelector('.home_value-content_wrapper') as HTMLElement

      if (index === this.wrappers!.length - 1) {
        gsap.set(card, {
          opacity: 1,
          scale: 1,
        })
        progressItems[0].classList.add('active')
      } else {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: wrapper as Element,
              start: 'center center',
              end: 'bottom top',
              scrub: true,
              pin: true,
              pinSpacing: false,
              markers: false,
            },
            onStart: () => {
              // console.log('start', index)
              progressItems[index + 1].classList.add('active')
              const newIndex = index + 1
              const progress = (newIndex / (this.wrappers!.length - 1)) * 100
              gsap.to(trackFill, { height: `${progress}%`, duration: 0.3 })
            },
            onReverseComplete: () => {
              // console.log('reverse complete', index)
              progressItems[index + 1].classList.remove('active')
              const newIndex = index
              const progress = (newIndex / (this.wrappers!.length - 1)) * 100
              gsap.to(trackFill, { height: `${progress}%`, duration: 0.3 })

              if (index === this.wrappers!.length - 2) {
                progressItems[this.wrappers!.length - 1].classList.remove('active')
              }
            },
            onComplete: () => {
              if (index === this.wrappers!.length - 2) {
                progressItems[index + 1].classList.add('active')
                gsap.to(trackFill, { height: `100%`, duration: 0.3 })
              }
            },
          })
          .set(card, { opacity: 1, scale: 1 })
          .to(card, { opacity: 0, scale: 0.6, ease: 'none' })
      }
    })

    this.scrollTo()
  }

  scrollTo() {
    const progressTrack = document.querySelector('.home_value-nav_track')
    const progressItems = progressTrack!.querySelectorAll('.home_value-nav_item')
    // const trackFill = progressTrack!.querySelector('.home_value-nav_track-fill')

    const pinSpacers = [...document.querySelectorAll('.pin-spacer')] as HTMLElement[]

    progressItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (!this.wrappers) return
        let offset = 200

        if (index === this.wrappers.length - 1) {
          this.lenis?.scrollTo(this.wrappers[index], {
            offset: -offset,
            onComplete: () => {
              ScrollTrigger.update()
            },
          })
          return
        }
        this.lenis?.scrollTo(pinSpacers[index], {
          offset: -offset,
          onComplete: () => {
            ScrollTrigger.update()
          },
        })
      })
    })
  }
}
