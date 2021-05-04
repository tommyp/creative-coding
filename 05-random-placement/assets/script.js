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
  const plotRadius = 200
  const angle = fullRotation *  i / numberOfShapes
  const ex = 250 + plotRadius * Math.cos(angle)
  const ey = 250 + plotRadius * Math.sin(angle)
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

    if (t < 0.5) {
      u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
    } else {
      u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0)
    }

    const cu = easeInOutCubic(u)

    x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex)
    y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey)
    const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er)

    const s = mapAndClamp(cu, 0, 1, shape.data.ss, shape.data.es)

    shape.translation.x = x
    shape.translation.y = y
    shape.rotation = r
    // shape.scale = s
  })
})

two.play()

