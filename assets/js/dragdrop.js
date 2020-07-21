// interact(". draggable").draggable({
//     // enable inertial throwing
//     inertia: true,
//     // keep the element within the area of it's parent
//     restrict: {
//         restriction: ".screen",
//         endOnly: true,
//         elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//     },
//     // enable autoScroll
//     autoScroll: true,
//     onstart: function (event) {
//         // event.target.style.zIndex = parseInt(new Date().getTime() / 1000);
//     },
//     onmove: function (event) {
//         var target = event.target,
//             // keep the dragged position in the data-x/data-y attributes
//             x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
//             y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
//         // translate the element
//         target.style.webkitTransform = target.style.transform = `translate(${x}px, ${y}px)`;
//         // update the position attributes
//         target.setAttribute("data-x", x);
//         target.setAttribute("data-y", y);
//     },
//     onend: function (event) {
//         var textEl = event.target.querySelector("p");
//         //    textEl && (textEl.textContent =
//         //        'moved a distance of '
//         //        + (Math.sqrt(event.dx * event.dx +
//         //            event.dy * event.dy)|0) + 'px');
//     }
// });

// interact(".dropzone").dropzone({
//     accept: '. draggable',
//     overlap: 0.75,
//     ondropactivate: function (event) {
//         const item = event.relatedTarget
//         item.classList.add('dragging')
//     },
//     ondropdeactivate: function (event) {
//         const item = event.relatedTarget
//         item.classList.remove('dragging', 'cannot-drop')
//     },
//     ondragenter: function(event) {
//         const item = event.relatedTarget
//         item.classList.remove('cannot-drop')
//         item.classList.add('can-drop')
//     },
//     ondragleave: function(event) {
//         const item = event.relatedTarget
//         item.classList.remove('can-drop')
//         item.classList.add('cannot-drop')
//     }
// })

// Event	On Event Handler	Fires when…
// drag	ondrag	…a dragged item (element or text selection) is dragged.
// dragend	ondragend	…a drag operation ends (such as releasing a mouse button or hitting the Esc key; see Finishing a Drag.)
// dragenter	ondragenter	…a dragged item enters a valid drop target. (See Specifying Drop Targets.)
// dragexit	ondragexit	…an element is no longer the drag operation's immediate selection target.
// dragleave	ondragleave	…a dragged item leaves a valid drop target.
// dragover	ondragover	…a dragged item is being dragged over a valid drop target, every few hundred milliseconds.
// dragstart	ondragstart	…the user starts dragging an item. (See Starting a Drag Operation.)
// drop	ondrop	…an item is dropped on a valid drop target. (See Performing a Drop.)

(function(){
    var draggableElements = null
    var dropzones = null

    initDragDrop = () => {
        draggableElements = Array.from( document.querySelectorAll('.draggable') )
        dropzones = Array.from( document.querySelectorAll('.dropzone') )
        _addEventListener()
    }

    _addEventListener = () => {
        draggableElements.forEach((element) => {
            element.addEventListener('dragstart', _dragStartHandler, false)
            element.addEventListener('dragend', _dragEndHandler, false)
        })
        dropzones.forEach((element) => {
            element.addEventListener('dragenter', _dragEnterHandler, false)
            element.addEventListener('dragleave', _dragLeaveHandler, false)
            element.addEventListener('dragover', _dragOverHandler, false)
            element.addEventListener('drop', _dropHandler, false)
        })
    }

    _dragStartHandler = (event) => {
        event.target.classList.add('dragged')

        let img = new Image()
        img.src = event.target.src

        // event.dataTransfer.setDragImage(img, 10, 10)

        // copy : indicates that the dragged data will be copied from its present location to the drop location.
        // move : indicates that the dragged data will be moved from its present location to the drop location.
        // link : indicates that some form of relationship or connection will be created between the source and drop locations.
        event.dataTransfer.setData("text/html", event.target.outerHTML)
    }

    _dragEndHandler = (event) => {
        event.target.classList.remove('dragged')
    }

    _dragEnterHandler = (event) => {
        event.preventDefault()
        if ( !dropzones.includes(event.target) ) return
        event.target.classList.add('drobable')
    }

    _dragLeaveHandler = (event) => {
        event.preventDefault()
        if ( !dropzones.includes(event.target) ) return
        event.target.classList.remove('drobable')
    }

    _dragOverHandler = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy';
        // event.target.classList.remove('dragged')
    }

    _dropHandler = (event) => {
        event.preventDefault()
        event.target.insertAdjacentHTML('beforeend', event.dataTransfer.getData('text/html'))
    }

    window.addEventListener('DOMContentLoaded', (event) => { initDragDrop() }, false)
})();