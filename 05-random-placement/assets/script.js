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
const loopDuration = 6 * 60
const aDelay = 0.0025

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const size = 20
  const sx = size * i + 10
  const sy = 250
  const sr = 0
  const ss = 1
  const ex = randomNumber(50, 450)
  const ey = randomNumber(50, 450)
  const er = randomNumber(-2 * fullRotation, 2 * fullRotation)
  const es = randomNumber(1, 4)

  const shape = two.makeRectangle(sx, sy, size, size)
  shape.noStroke()
  shape.fill = "#004F73"
  shape.data = {
    sx: sx,
    sy: sy,
    sr: sr,
    ss: ss,
    ex: ex,
    ey: ey,
    er: er,
    es: es,
  }
  shapes.push(shape)
}

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration

  shapes.forEach((shape, i) => {
    const aStart = aDelay * (numberOfShapes - i)
    const aEnd = aDelay * i
    let x
    let y
    let u = 0

    if (currentFrame === 0) {
      shape.data.ex = randomNumber(50, 450)
      shape.data.ey = randomNumber(50, 450)
      shape.data.er = randomNumber(-2 * fullRotation, 2 * fullRotation)
    }

    if (t < 0.5) {
      u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
    } else {
      u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0)
    }

    const cu = easeInOutCubic(u)

    x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex)
    y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey)
    const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er)

    shape.translation.x = x
    shape.translation.y = y
    shape.rotation = r
  })
})

const bgColors = [
  "#45d3c5",
  "#ffe8b4",
  "#f9d2cd",
  "#bcdffd",
]

const shapeColors = [
  "#004F73",
  "#f8bc30",
  "#f45745",
  "#5745d3",
]

let currentColor = 0

document.addEventListener('click', (e) => {
  currentColor += 1
  currentColor = currentColor % bgColors.length
  document.querySelector('body').style.backgroundColor = bgColors[currentColor]
  shapes.forEach((shape) => shape.fill = shapeColors[currentColor])
})

two.play()

