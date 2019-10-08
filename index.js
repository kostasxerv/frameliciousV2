
function cancel(evt){
	evt.preventDefault()
}

let activeAnimation;
function drop(ev){
	ev.preventDefault()
  ev.target.innerHTML = ''
 	var data = Array(...ev.dataTransfer.files)
 	console.log(data)
  const frames = []
 	data.forEach((d,i) => {
 		var reader = new FileReader()
 		reader.readAsDataURL(d)
 		reader.onload = (src) => {
 			console.log(src)
      const img = new Image()
      img.src = src.srcElement.result
      img.onload = () => {
        frames[i] = img
        if (frames.length === data.length){
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
  a.play(document.querySelector('#myCan').getContext('2d'))
  activeAnimation = a
}
