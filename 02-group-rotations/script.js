// pick a tag
const container = document.querySelector('section')

// set up two.js
const params = {
  width: 500,
  height: 500,
}

const two = new Two(params)
two.appendTo(container)

const numberOfShapes = 12
const plotRadius = 150

const shapes = []

for (let i = 0; i < numberOfShapes; i++) {
  const angle = Math.PI * 2 * i / numberOfShapes
  const x = plotRadius * Math.cos(angle)
  const y = plotRadius * Math.sin(angle)
  const shape = two.makeRectangle(x, y, 50, 50)
  shape.fill = "#f9bc31"
  shape.rotation = angle
  shape.noStroke()

  shapes.push(shape)
}

const group = two.makeGroup(shapes)
group.translation.set(250, 250)

let scaler = 1
let scaling = "grow"

two.bind('update', () => {
  group.rotation += 0.005
  if (scaling === "grow") {
    scaler += 0.005
  } else {
    scaler -= 0.005
  }

  if (scaler > 3) {
    scaling = "shrink"
  }

  if (scaler < 0.5) {
    scaling = "grow"
  }



  shapes.forEach((shape) => {
    shape.scale = scaler
    shape.rotation += 0.025
  })
})

two.play()
