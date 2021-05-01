const container = document.querySelector("section")

const params = {
  width: 500,
  height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const loopDuration = 60 * 4
const numberOfShapes = 40
const shapeIncr = 20
const shapes = []
const aDelay = 1 / 120

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const size = (numberOfShapes - i) * shapeIncr
  const shape = two.makeRectangle(250, 250, size, size)
  shape.fill = i % 2 === 0 ? "#f55745" : "#f9d2cd"
  shape.noStroke()

  shapes.push(shape)
}

// two.bind("update", function () {
//   shapes.forEach((shape) => {
//     shape.rotation += 0.005
//   })
// })

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration

  shapes.forEach((shape, idx) => {
    const aStart = aDelay * (numberOfShapes - idx)
    const aEnd = aDelay * idx
    const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1)
    shape.rotation = easeInOutCubic(u) * halfRotation
  })
})

two.play()

