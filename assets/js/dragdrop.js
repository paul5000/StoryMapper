interact(".dropzone").dropzone({
    accept: '.draggable',
    ondrop: (event) => {
        const item = event.relatedTarget
        let imageElement = document.createElement('img')
        imageElement.src = base64ImageEncode(item, item.width, item.height)
        imageElement.classList.add('moveable')
        event.target.appendChild(imageElement)
    }
})

interact(".draggable").draggable({
    inertia: true,
    startAxis: 'xy',
    lockAxis: 'start',
    onmove: (event) => {
        if (event.dx != 0) {
            event.target.parentNode.parentNode.scrollLeft -= event.dx
        }
    }
});

interact(".moveable").draggable({
    onmove: (event) => {
        event.target.style.left = `${event.target.offsetLeft + event.dx}px`
        event.target.style.top = `${event.target.offsetTop + event.dy}px`
    }
});