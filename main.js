import kaboom from "./libs/kaboom.mjs";

kaboom({
  width: 320,
  height: 2000,
  font: "sans-serif",
  canvas: document.querySelector("#mycanvas"),
  background: [ 0, 0, 255, ],
})

// define gravity
setGravity(2400)

// load a default sprite
loadSprite("bean", "assets/bean.png")
//loadSprite("bean", "sprites/bean.png")


// add character to screen, from a list of components
const player = add([
    sprite("bean"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    body(),          // responds to physics and gravity
])

// jump when player presses "space" key
onKeyPress("space", () => {
    // .jump() is provided by the body() component
    player.jump()
})