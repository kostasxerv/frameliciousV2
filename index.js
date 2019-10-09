
function cancel(evt){
	evt.preventDefault()
}

let activeAnimation;
function drop(ev){
	ev.preventDefault()
  // ev.target.style.display = 'none'
 	var data = Array(...ev.dataTransfer.files)
  const sortedData = data.sort((a,b) => {
    if(a.name > b.name) return 1
    if(a.name < b.name) return -1
    return 0
  })

  const frames = []
 	sortedData.forEach((d,i) => {
 		var reader = new FileReader()
 		reader.readAsDataURL(d)
 		reader.onload = (src) => {
      const img = new Image()
      img.src = src.srcElement.result
      img.onload = () => {
        frames[i] = img
        if (frames.length === sortedData.length){
          playAnimation(frames)
        }
      }
 		}
 	})
}

const playAnimation = (frames) => {
   if(activeAnimation){
    activeAnimation.stop()
  }
  const a = new AnimationPlayer(frames)
  window.resizeTo(a.width * 1.2, a.height * 1.2)

  a.play(context)
  activeAnimation = a
}
