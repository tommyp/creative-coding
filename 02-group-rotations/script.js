// pick a tag
const container = document.querySelector('section')

// set up two.js
const params = {
  width: 500,
  height: 500,
}

const two = new Two(params)
two.appendTo(container)

const numberOfShapes = 40
const plotRadius = 150

const shapes = []

for (let i = 0; i < numberOfShapes; i++) {
  const angle = Math.PI * 2 * i / numberOfShapes
  const x = plotRadius * Math.cos(angle)
  const y = plotRadius * Math.sin(angle)
  const shape = two.makeRectangle(x, y, 10, 200)
  shape.fill = "#f9bc31"
  shape.rotation = angle
  shape.noStroke()

  shapes.push(shape)
}

const group = two.makeGroup(shapes)
group.translation.set(250, 250)

two.bind('update', () => {
  shapes.forEach((shape) => {
    shape.rotation += 0.004
  })
  group.rotation += 0.000615
})

two.play()
