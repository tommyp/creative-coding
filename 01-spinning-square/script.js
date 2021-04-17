// pick a tag
const container = document.querySelector('section')

// set up two.js
const params = {
  width: 500,
  height: 500,
}

const two = new Two(params)
two.appendTo(container)

const shape = two.makeRectangle(250, 250, 100, 100)
shape.fill = "#f9bc31"
shape.noStroke()
two.bind('update', (frameCount) => {
  shape.rotation += 0.05
}).play()
