import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Slider from './slider'

export default class Values {
  wrapper: HTMLElement | null
  triggers: HTMLElement[]
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
        images: el.querySelectorAll('[data-value-image]') as NodeListOf<HTMLElement>,
        imageWrapper: el.querySelector('[data-value-image-wrapper]') as HTMLElement | null,
        graphHighlight: el.querySelector('.graph-highlight') as HTMLElement | null,
      })
    })
    // console.log(this.elementsChildren)
    // this.createTimeline()
    if (window.innerWidth > 768) {
      // console.log('create scroll trigger')
      this.createScrollTrigger()
    } else {
      // console.log('create slider')
      this.createSlider()
    }
    this.addEventListeners()
  }

  createSlider() {
    new Slider({ element: document.querySelector('.home_value-block') as HTMLElement })
  }

  createScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger)

    // gsap.set(this.elements, { autoAlpha: 0 })
    this.elements.forEach((el, index) => {
      console.log(el), this.animateOut(index)
    })
    this.animateIn(0)

    this.triggers.forEach((trigger, index) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: 'center center',
        endTrigger: trigger.nextElementSibling ? trigger.nextElementSibling : trigger,
        end: 'center center',
        onEnter: () => {
          // console.log('enter', index)
          // First element is already visible
          if (index === 0) return
          this.animateIn.bind(this)(index)
        },
        onLeave: () => {
          // console.log('leave', index)
          if (index === this.elements.length - 1) return
          this.animateOut.bind(this)(index)
        },
        onEnterBack: () => {
          // console.log('enter back', index)
          if (index === this.elements.length - 1) return
          this.animateIn.bind(this)(index)
        },
        onLeaveBack: () => {
          // console.log('leave back', index)
          if (index === 0) return
          this.animateOut.bind(this)(index)
        },
        markers: false,
      })
    })
  }

  animateIn(index: number) {
    this.tl = gsap.timeline()
    this.tl
      .to(this.elementsChildren[index!].title, { autoAlpha: 1, duration: 0.5 })
      .to(this.elementsChildren[index!].number, { autoAlpha: 1, duration: 0.5 }, '-=0.3')
      .to(this.elementsChildren[index!].text, { autoAlpha: 1, duration: 0.5 }, '-=0.3')
      .to(this.elementsChildren[index!].graph, { autoAlpha: 1, duration: 0.5 }, '-=0.3')
      .to(this.elementsChildren[index!].imageWrapper, { autoAlpha: 1, duration: 0.3 }, '-=0.3')
      .to(this.elementsChildren[index!].images, { autoAlpha: 1, duration: 0.66, ease: 'Power4.out' }, '-=0.3')
      .to(this.elementsChildren[index!].graphHighlight, { scaleY: 1, duration: 0.5 }, '-=0.5')
  }

  animateOut(index: number) {
    this.tl = gsap.timeline()
    this.tl
      .to(this.elementsChildren[index!].title, { autoAlpha: 0, duration: 0.5 })
      .to(this.elementsChildren[index!].number, { autoAlpha: 0, duration: 0.5 }, '-=0.3')
      .to(this.elementsChildren[index!].text, { autoAlpha: 0, duration: 0.5 }, '-=0.3')
      .to(this.elementsChildren[index!].graph, { autoAlpha: 0, duration: 0.5 }, '-=0.3')
      .to(this.elementsChildren[index!].imageWrapper, { autoAlpha: 0, duration: 0.3 }, '-=0.3')
      .to(this.elementsChildren[index!].images, { autoAlpha: 0, duration: 0.66, ease: 'Power4.out' }, '-=0.3')
      .to(this.elementsChildren[index!].graphHighlight, { scaleY: 0, duration: 0.5 }, '-=0.5')
  }

  createTimeline() {
    gsap.registerPlugin(ScrollTrigger)
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.home_value-block',
        start: 'center center',
        endTrigger: '.container.has_values',
        end: 'bottom bottom',
        pin: '.home_value-block',
        scrub: 0.0001,
        markers: true,
        pinSpacing: true,
      },
    })
    this.setAnimations()
  }

  setAnimations() {
    if (!this.tl) return
    // Define your animations here
    this.elements.forEach((element) => {
      const children = {
        title: element.querySelector('[data-value-title]') as HTMLElement | null,
        number: element.querySelector('[data-value-number]') as HTMLElement | null,
        text: element.querySelector('[data-value-text]') as HTMLElement | null,
        graph: element.querySelector('[data-value-graph]') as HTMLElement | null,
        images: element.querySelectorAll('[data-value-image]') as NodeListOf<HTMLElement>,
        imageWrapper: element.querySelector('[data-value-image-wrapper]') as HTMLElement | null,
        graphHighlight: element.querySelector('.graph-highlight') as HTMLElement | null,
      }

      // Don't animate the first one
      if (element === this.elements[0]) {
        this.tl!.set(children.title, { autoAlpha: 1 })
          .set(children.number, { autoAlpha: 1 })
          .set(children.text, { autoAlpha: 1 })
      } else {
        this.tl!.fromTo(children.title, { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo(children.number, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=0.5')
          .fromTo(children.text, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=0.5')
          .fromTo(children.imageWrapper, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=0.3')
          .fromTo(children.images, { y: '100%' }, { y: '0%' }, '-=0.5')
          .fromTo(children.graph, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=0.2')
          .fromTo(
            children.graphHighlight,
            { scaleY: 0 },
            {
              scaleY: 1,
            },
            '-=0.5'
          )

        // now they fade out before the next element
      }
      // Don't fade out the last one
      if (element !== this.elements[this.elements.length - 1]) {
        this.tl!.to(children.title, { autoAlpha: 0 }, '+=0.5')
          .to(children.number, { autoAlpha: 0 }, '-=0.5')
          .to(children.text, { autoAlpha: 0 }, '-=0.5')
          .to(children.graph, { autoAlpha: 0 }, '-=0.5')
          .to(children.imageWrapper, { autoAlpha: 0 }, '-=0.5')
          .to(children.images, { y: '100%' }, '-=0.5')
          .to(
            children.graphHighlight,
            {
              scaleY: 0,
            },
            '-=0.5'
          )
      }
    })
  }

  setSticky() {}

  // animateIn(element: HTMLElement, index?: number) {}
  // animateOut(element: HTMLElement, index?: number) {}

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {
    this.setSticky()
  }
}
