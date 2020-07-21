// functions that hide all screens & then show a specific screen
// these functions also update navigation menu to highlight active screen

function hideScreens() {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(function (screen) {
    screen.classList.remove('screen--active');
  });
}

function showScreen(id) {
  hideScreens();
  document.querySelector(id).classList.add('screen--active');
}

function loadBase64Sources(element) {
  let canvas = document.createElement('canvas')
  context = canvas.getContext('2d')
  let image = new Image()
  image.crossOrigin = "anonymous"
  image.onload = function () {
    context.drawImage(image, 0, 0)
    element.src = canvas.toDataURL()
  }
  image.src = element.dataset.base64Src;
  canvas.remove()
}

window.addEventListener("load", (event) => {
  // document.querySelectorAll('[data-base64-src]').forEach(loadBase64Sources)
  showScreen('#screen1')
}, false);
