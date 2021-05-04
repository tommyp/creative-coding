const container = document.querySelector("section")

const params = {
  width: 500,
  height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const numberOfShapes = 50
const shapes = []
const startWidth = 50
const endWidth = 500
const diffWidth = endWidth - startWidth
const startRotation = 0
const endRotation = fullRotation * 6 / 360
const loopDuration = 12 * 60
const aDelay = 0.001

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const x = 250
  let y = i * 20 + 5

  if (i >= 25) {
    y -= 490
  }

  const shape = two.makeRectangle(x, y, startWidth, 10)
  shape.noStroke()
  shape.fill = "#5645d3"

  if (i >= 25) {
    shape.fill = "#99e6e0"
  }


  shapes.push(shape)
}

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration

  shapes.forEach((shape, i) => {
    let r = startRotation
    let w = startWidth
    let aStart = aDelay * i
    let aEnd = aDelay * (numberOfShapes - i)

    if (i >= 25) {
      aStart = aDelay * (numberOfShapes - i)
      aEnd = aDelay * i
    }

    if (t < 0.25) {
      // sequence 1, width grows
      const u = mapAndClamp(t, 0 + aStart, 0.25 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      w = mapAndClamp(cu, 0, 1, startWidth, endWidth)
      r = startRotation
    } else if (t < 0.5) {
      // sequence 2, rotate rectangles
      w = endWidth
      const u = mapAndClamp(t, 0.25 + aStart, 0.5 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      r = mapAndClamp(cu, 0, 1, startRotation, endRotation)
    } else if (t < 0.75) {
      // sequence 3, width shrinks
      const u = mapAndClamp(t, 0.5 + aStart, 0.75 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      w = mapAndClamp(cu, 0, 1, endWidth, startWidth)
      r = endRotation
    } else {
      // sequence 4, rectangles rotate back
      w = startWidth
      const u = mapAndClamp(t, 0.75 + aStart, 1 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      r = mapAndClamp(cu, 0, 1, endRotation, startRotation)
    }

    shape.width = w
    shape.rotation = r

    if (i >= 25) {
      shape.rotation = -r
    }
  })
})

two.play()

