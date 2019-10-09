class AnimationPlayer {


  constructor(frames) {
    this.frames = frames || []
    
    this.currentFrame = 0
    this.loop = true

    this.lastTimestampRendered= 0
  }

  get duration(){
    return this.frames.length / window.BASE_FRAME_RATE
  }

  get width() {
    return this.frames.length ? this.frames[0].width : 0
  }

  get height() {
    return this.frames.length ? this.frames[0].height : 0
  }

  play(context) {
    this.active = true
    this.toRender = true
    requestAnimationFrame((timestamp) => this.render(context, timestamp))
  }

  pause() {
    this.active = false
  }

  stop() {
    this.active = false
    this.currentFrame = 0
  }

  render(context = this.context, timestamp) {
    if (!this.active) return


    if (timestamp - this.lastTimestampRendered < this.duration * 16.6667) {
      requestAnimationFrame((timestamp) => this.render(context, timestamp))
      return
    }
    
    this.lastTimestampRendered = timestamp

    context.canvas.width = this.frames[this.currentFrame].width
    context.canvas.height = this.frames[this.currentFrame].height

    context.drawImage(this.frames[this.currentFrame], 0, 0)

    this.currentFrame++
    if (this.currentFrame == this.frames.length) {
      if (this.loop) {
        this.currentFrame = 0
      } else {
        this.active = false
      }
    }


    requestAnimationFrame((timestamp) => this.render(context, timestamp))
  }
}

window.BASE_FRAME_RATE = 30