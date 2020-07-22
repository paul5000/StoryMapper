interact(".dropzone").dropzone({
    accept: '.draggable',
    overlap: 0.75,
    ondropactivate: function (event) {
        const item = event.relatedTarget
        item.classList.add('dragging')

        let imageElement = document.createElement('img')
        imageElement.src = base64ImageEncode(item, item.width, item.height)
        imageElement.classList.add('moveable')
        event.target.appendChild(imageElement)
    }
})

interact(".draggable").draggable({
    onstart: function (event) {
    },
    onmove: function (event) {
    },
    onend: function (event) {
    }
});

interact(".moveable").draggable({
    onstart: function (event) {
    },
    onmove: function (event) {
        event.target.style.left = `${event.target.offsetLeft + event.dx}px`
        event.target.style.top = `${event.target.offsetTop + event.dy}px`
    },
    onend: function (event) {
    }
});

// Event	On Event Handler	Fires when…
// drag	ondrag	…a dragged item (element or text selection) is dragged.
// dragend	ondragend	…a drag operation ends (such as releasing a mouse button or hitting the Esc key; see Finishing a Drag.)
// dragenter	ondragenter	…a dragged item enters a valid drop target. (See Specifying Drop Targets.)
// dragexit	ondragexit	…an element is no longer the drag operation's immediate selection target.
// dragleave	ondragleave	…a dragged item leaves a valid drop target.
// dragover	ondragover	…a dragged item is being dragged over a valid drop target, every few hundred milliseconds.
// dragstart	ondragstart	…the user starts dragging an item. (See Starting a Drag Operation.)
// drop	ondrop	…an item is dropped on a valid drop target. (See Performing a Drop.)

// (function(){
//     var activeElement;
//     var currentX;
//     var currentY;
//     var initialX;
//     var initialY;
//     var xOffset = 0;
//     var yOffset = 0;

//     initDragDrop = () => {
//         document.querySelector('.dropzone').forEach(_addDropzoneEvents)
//         document.querySelectorAll('.draggable').forEach(_addDraggableEvents)
//         document.querySelectorAll('.moveable').forEach(_addMoveableEvents)
//     }

//     _addDropzoneEvents = (element) => {
//         element.addEventListener('dragover',    _dragOverHandler, false)
//         element.addEventListener('drop',        _dropHandler, false)
//     }

//     _addDraggableEvents = (element) => {
//         element.addEventListener('dragstart',   _dragStartHandler, false)
//         element.addEventListener('touchstart',  _dragStartHandler, false)
//         element.addEventListener('dragend',     _dragEndHandler, false)
//         element.addEventListener('touchend',    _dragEndHandler, false)
//     }

//     _addMoveableEvents = (element) => {
//         element.addEventListener('dragstart',   _moveStartHandler, false)
//         element.addEventListener('touchstart',  _moveStartHandler, false)
//         element.addEventListener('drag',        _moveHandler, false)
//         element.addEventListener('touchmove',   _moveHandler, false)
//     }

//     // dropzone events

//     _dragOverHandler = (event) => {
//         event.preventDefault()
//         event.dataTransfer.dropEffect = 'copy';
//     }

//     _dropHandler = (event) => {
//         event.preventDefault()

//         initialX = currentX
//         initialY = currentY

//         if (activeElement.classList.contains('draggable')) {
//             let imageElement = document.createElement('img')
//             imageElement.src = base64ImageEncode(activeElement, activeElement.width, activeElement.height)
//             imageElement.classList.add('moveable')
//             _addMoveableEvents(imageElement)
//             event.target.appendChild(imageElement)
//         }
//     }

//     // draggable events

//     _dragStartHandler = (event) => {
//         activeElement = event.target
//     }

//     _dragEndHandler = (event) => {
//         activeElement = event.target
//     }

//     // moveable events

//     _moveStartHandler = (event) => {
//         activeElement = event.target
//         if (event.type === "touchstart") {
//             initialX = event.touches[0].clientX - xOffset
//             initialY = event.touches[0].clientY - yOffset
//         } else {
//             initialX = event.clientX - xOffset
//             initialY = event.clientY - yOffset
//         }
//     }

//     _moveHandler = (event) => {
//         event.preventDefault()
//         if (event.type === "touchmove") {
//             currentX = event.touches[0].clientX - initialX
//             currentY = event.touches[0].clientY - initialY
//         } else {
//             currentX = event.clientX - initialX
//             currentY = event.clientY - initialY
//         }
//         xOffset = currentX
//         yOffset = currentY
//         activeElement.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
//     }

//     window.addEventListener('DOMContentLoaded', () => { initDragDrop() }, false)
// })()