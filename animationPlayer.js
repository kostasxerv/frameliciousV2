class AnimationPlayer {
  constructor (frames, duration) {
    this.frames = frames
    this.framesCount = frames.length
    this.duration = duration || this.frames.length / 60 
    this.currentFrame = 0
    this.loop = true

    this.lastRender = 0
  }

  play (context) {
    this.active = true
    this.currentFrame = 0
    this.toRender = true
    requestAnimationFrame(() => this.render(context))
  }

  stop () {
    this.active = false
  }

  render (context = this.context) {
   if(!this.active) return

   if(!this.toRender){
     this.toRender = true
     requestAnimationFrame(() => this.render(context))
     return
   }  

   this.toRender = false

   context.canvas.width = this.frames[this.currentFrame].width
   context.canvas.height = this.frames[this.currentFrame].height

   context.drawImage(this.frames[this.currentFrame], 0, 0)
   this.currentFrame++
   if(this.currentFrame == this.frames.length){
     if(this.loop){
        this.currentFrame = 0
     }else {
       this.active = false
     }
   }
  
    requestAnimationFrame(() => this.render(context))

  }
}

