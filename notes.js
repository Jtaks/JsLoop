"use-strict"
let run = false
let fps = 60
let speed = 1
let lastTime = new Date().getTime()

console.log('Starting game')



console.log('Good bye!')

/* traditional loop

const MS_PER_UPDATE = 1000 / 60 // 60 updates in one second?
let previous = new Date().getTime()
while (true) {
  let current = new Date().getTime()
  let elapsed = current - previous
  previous = current
  lag += elapsed

  input()

  while (lag >= MS_PER_UPDATE) {
    update()
    lag -= MS_PER_UPDATE
  }

  render(lag / MS_PER_UPDATE)
}


DONT USE INTERVAL/TIMER! Use requestAnimationFrame(callback)
*/
