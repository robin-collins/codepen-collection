import gsap from 'https://cdn.skypack.dev/gsap@3.13.0'
import Draggable from 'https://cdn.skypack.dev/gsap@3.13.0/Draggable'
import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
gsap.registerPlugin(Draggable)

const config = {
  theme: 'system',
  explode: false,
  frame: 6,
  radius: 24,
  height: 60,
}

const ctrl = new Pane({
  title: 'config',
  expanded: true,
})

const update = async () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.explode = config.explode
  document.documentElement.style.setProperty('--frame', `${config.frame}vh`)
  document.documentElement.style.setProperty('--radius', config.radius)
  document.documentElement.style.setProperty('--height', config.height)
  if (!config.explode) {
    await Promise.all(document.querySelector('.scene').getAnimations().map((a) => a.finished))
    document.documentElement.dataset.collapsed = 'true'
  } else {
    document.documentElement.dataset.collapsed = 'false'
  }
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'theme'
  )
    return update()
  document.startViewTransition(() => update())
}
ctrl.addBinding(config, 'frame', {
  min: 0,
  max: 20,
  step: 1,
})
ctrl.addBinding(config, 'height', {
  min: 30,
  max: 100,
  step: 1,
})
ctrl.addBinding(config, 'radius', {
  min: 0,
  max: 200,
  step: 1,
})

ctrl.addBinding(config, 'explode')

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

// make tweakpane panel draggable
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
