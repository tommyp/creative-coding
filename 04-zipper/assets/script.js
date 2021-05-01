const container = document.querySelector("section")

const params = {
  width: 500,
  height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const numberOfShapes = 25
const shapes = []
const shapeMin = 0
const shapeMax = 500
const shapeDiff = shapeMax - shapeMin
const loopDuration = 4 * 60

let t = 0

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const x = 250
  const y = 20 * i + 5

  const shape = two.makeRectangle(x, y, shapeMin, 10)
  shape.fill = "#5645d3"
  shape.noStroke()
  shapes.push(shape)
}

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration

  shapes.forEach((shape, idx) => {
    const aStart = 0.01 * (numberOfShapes - idx)
    const aEnd = 0.01 * idx
    let u = 0
    if (t < 0.5) {
      u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
    } else {
      u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0)
    }
    shape.width = shapeMin + shapeDiff * easeInOutCubic(u)
    shape.translation.x = 750 * easeInOutCubic(u)
  })
})

document.addEventListener('scroll', (e) => {
  const scrollY = window.pageYOffset
  const scrollMax = 4000 - window.innerHeight
  t = mapAndClamp(scrollY, 0, scrollMax, 0, 1)
})

// document.addEventListener('mousemove', (e) => {
//   t = mapAndClamp(e.screenX, 0, window.innerWidth, 0, 1)
// })

two.play()

