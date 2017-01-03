class GameObject {
  constructor(x, y, height, width, colour, id, tag, yspeed) {
    this.x = x
    this.y = y
    this.xspeed = 0
    this.yspeed = getRandomInt(1, 10)
    this.height = height
    this.width = width
    this.colour = colour
    this.id = id
    this.element = document.createElement(tag)
    this.element.style.position = 'absolute'
    this.element.style.padding = '0'
    this.element.style.margin = '0'
  }

  update() {
    this.y += this.yspeed
    this.yspeed += Fg

    // Reset once out of frame
    if (this.y > height) {
      this.y = getRandomInt(-100, -500)
      this.yspeed = getRandomInt(1, 10)
    }

    // Reset if screen is resized
    if (this.x > width || this.x < 0) {
      this.x = getRandomInt(0, width)
    }
  }

  draw() {
    this.element.style.background = this.colour
    this.element.style.height = this.height + 'px'
    this.element.style.width = this.width + 'px'
    this.element.style.top = this.y + 'px'
    this.element.style.left = this.x + 'px'
  }
}
