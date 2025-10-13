import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default class Values {
  wrapper: HTMLElement | null
  triggers: HTMLElement[]
  tl: gsap.core.Timeline | undefined
  elementsChildren: {
    title: HTMLElement | null
    number: HTMLElement | null
    text: HTMLElement | null
    graph: HTMLElement | null
    image: HTMLElement | null
    graphHighlight: HTMLElement | null
  }[] = []
  elements: NodeListOf<HTMLElement>
  constructor(options = { element: null as HTMLElement | null }) {
    this.wrapper = options.element
    this.triggers = this.wrapper
      ? (Array.from(this.wrapper.querySelectorAll('.home_value-trigger')) as HTMLElement[])
      : []

    this.elements = document.querySelectorAll('[data-value-wrapper]')
    this.elementsChildren = []
    this.elements.forEach((el) => {
      this.elementsChildren.push({
        title: el.querySelector('[data-value-title]') as HTMLElement | null,
        number: el.querySelector('[data-value-number]') as HTMLElement | null,
        text: el.querySelector('[data-value-text]') as HTMLElement | null,
        graph: el.querySelector('[data-value-graph]') as HTMLElement | null,
        image: el.querySelector('[data-value-image]') as HTMLElement | null,
        graphHighlight: el.querySelector('.graph-highlight') as HTMLElement | null,
      })
    })
    this.create()
    this.addEventListeners()
  }

  create() {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(this.elements, { autoAlpha: 0, display: 'none' })
    // gsap.set(this.elements[1], { autoAlpha: 1 })
    this.animateIn(this.elements[0], 0)

    setTimeout(() => {
      this.setSticky()
    }, 100)

    this.triggers.forEach((trigger, index) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: 'top center',
        // endTrigger: trigger.nextElementSibling ? trigger.nextElementSibling : trigger,
        end: 'bottom center',

        onEnter: () => {
          // console.log('enter', index)
          if (index === 0) return
          this.animateIn.bind(this)(this.elements[index], index)
        },
        onEnterBack: () => {
          // console.log('enterback', index)
          if (index === this.elements.length - 1) return
          this.animateIn.bind(this)(this.elements[index], index)
        },
        onLeave: () => {
          // console.log('leave', index)
          if (index === this.elements.length - 1) return
          this.animateOut.bind(this)(this.elements[index], index)
        },
        onLeaveBack: () => {
          // console.log('leaveback', index)
          if (index === 0) return
          this.animateOut.bind(this)(this.elements[index], index)
        },

        markers: false,
      })
    })
  }
  setSticky() {
    const block = document.querySelector('.home_value-block') as HTMLElement | null
    let blockHeight = 0

    this.elements.forEach((el) => {
      // console.log('el', el)
      const height = el.clientHeight
      // console.log('height', height)

      const headerHeight = document.querySelector('.home_value-header')?.clientHeight || 0
      const totalHeight = height + headerHeight
      blockHeight = Math.max(blockHeight, totalHeight)
    })
    // console.log('blockHeight', blockHeight)

    const deltaHeight = (window.innerHeight - blockHeight) / 2
    // console.log('deltaHeight', deltaHeight)
    if (block) {
      block.style.top = `${deltaHeight}px`
    }
    // console.log('deltaHeight', deltaHeight)
  }

  animateIn(element: HTMLElement, index?: number) {
    // console.log(this.elementsChildren, index)
    this.tl = gsap.timeline()
    this.tl.to(element, { display: 'flex', autoAlpha: 1, duration: 0.433 })
    this.tl.fromTo(
      this.elementsChildren[index as number].title,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.433 }
    )
    this.tl.fromTo(
      this.elementsChildren[index as number].number,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.433 },
      '-=0.33'
    )
    this.tl.fromTo(
      this.elementsChildren[index as number].text,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.433 },
      '-=0.33'
    )
    this.tl.fromTo(
      this.elementsChildren[index as number].graph,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.433 },
      '-=0.33'
    )
    this.tl.fromTo(
      this.elementsChildren[index as number].image,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.433 },
      '-=0.33'
    )
    this.tl.fromTo(
      this.elementsChildren[index as number].graphHighlight,
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        duration: 0.433,
      }
    )

    // this.tl.kill()

    // gsap.to(element, {
    //   display: 'flex',
    //   autoAlpha: 1,
    //   duration: 0.433,
    // })
  }
  animateOut(element: HTMLElement, index?: number) {
    this.tl = gsap.timeline()
    this.tl.to(this.elementsChildren[index as number].image, { y: 20, autoAlpha: 0, duration: 0.433 })
    this.tl.to(this.elementsChildren[index as number].graph, { y: 20, autoAlpha: 0, duration: 0.433 }, '-=0.33')
    this.tl.to(this.elementsChildren[index as number].text, { y: 20, autoAlpha: 0, duration: 0.433 }, '-=0.33')
    this.tl.to(this.elementsChildren[index as number].number, { y: 20, autoAlpha: 0, duration: 0.433 }, '-=0.33')
    this.tl.to(this.elementsChildren[index as number].title, { y: 40, autoAlpha: 0, duration: 0.433 }, '-=0.33')
    this.tl.to(this.elementsChildren[index as number].graphHighlight, { scaleY: 0, duration: 0.433 }, '-=0.33')
    this.tl.to(element, { display: 'none', autoAlpha: 0, duration: 0.433 })
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {
    this.setSticky()
  }
}
