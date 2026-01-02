import gsap from 'https://cdn.skypack.dev/gsap@3.13.0'
import Draggable from 'https://cdn.skypack.dev/gsap@3.13.0/Draggable'
import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
gsap.registerPlugin(Draggable)

const config = {
  theme: 'system',
  // base: 0.05,
  tile: 10,
  size: 1,
  offset: 3,
  operator: 'dilate',
  radius: 4.5,
  active: true,
}

const ctrl = new Pane({
  title: 'config',
  expanded: true,
})

const update = () => {
  document.documentElement.dataset.theme = config.theme
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'tile', {
  min: 0,
  max: 20,
  step: 1,
  label: 'tile',
}).on('change', () => {
  gsap.set('feComposite:first-of-type', {
    attr: {
      width: config.tile,
      height: config.tile,
    }
  })
})
ctrl.addBinding(config, 'size', {
  min: 0,
  max: 10,
  step: 1,
  label: 'size',
}).on('change', () => {
  gsap.set('feFlood', {
    attr: {
      x: config.offset,
      y: config.offset,
      width: config.size,
      height: config.size,
    }
  })
})
ctrl.addBinding(config, 'offset', {
  min: 0,
  max: 20,
  step: 1,
  label: 'offset',
}).on('change', () => {
  gsap.set('feFlood', {
    attr: {
      x: config.offset,
      y: config.offset,
      width: config.size,
      height: config.size,
    }
  })
})
ctrl.addBinding(config, 'radius', {
  min: 0,
  max: 10,
  step: 0.5,
  label: 'radius',
}).on('change', () => {
  gsap.set('feMorphology', {
    attr: {
      operator: config.operator,
      radius: config.radius,
    }
  })
})
ctrl.addBinding(config, 'operator', {
  label: 'operator',
  options: {
    dilate: 'dilate',
    erode: 'erode',
  },
}).on('change', () => {
  gsap.set('feMorphology', {
    attr: {
      operator: config.operator,
      radius: config.radius,
    }
  })
})

ctrl.addBinding(config, 'active').on('change', () => {
  if (config.active) {
    gsap.timeline()
      .to('feFlood', {
        attr: {
          x: config.offset,
          y: config.offset,
          width: config.size,
          height: config.size,
        }
      })
      .to('feComposite:first-of-type', {
        attr: {
          width: config.tile,
          height: config.tile,
        }
      }, 0)
      .to('feMorphology', {
        attr: {
          operator: config.operator,
          radius: config.radius,
        }
      }, 0)
  } else {
    gsap.timeline()
    .to('feFlood', {
      attr: {
        x: config.offset,
        y: config.offset,
        width: 1,
        height: 1,
      }
    })
    .to('feComposite:first-of-type', {
      attr: {
        width: 1,
        height: 1,
      }
    }, 0)
    .to('feMorphology', {
      attr: {
        operator: config.operator,
        radius: 0,
      }
    }, 0)
  }
})

ctrl.addBinding(config, 'theme', {
  label: 'theme',
  options: {
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
})
ctrl.on('change', sync)
update()


const tweakClass = 'div.tp-dfwv'
const d = Draggable.create(tweakClass, {
  type: 'x,y',
  allowEventDefault: true,
  trigger: tweakClass + ' button.tp-rotv_b',
})
document.querySelector(tweakClass).addEventListener('dblclick', () => {
  gsap.to(tweakClass, {
    x: `+=${d[0].x * -1}`,
    y: `+=${d[0].y * -1}`,
    onComplete: () => {
      gsap.set(tweakClass, { clearProps: 'all' })
    },
  })
})


document.body.addEventListener('pointermove', ({ x }) => {
  gsap.set('.wrapper', {
    '--pointer-x': ((x / window.innerWidth) - 0.5) * 2,
  })
})