import kaboom from "./libs/kaboom.mjs";

//Initialize kaboom
kaboom()

// define gravity
setGravity(1600)

//add a platform to avoid characters falling into oblivion
add([
  rect(width(), 48), // renders a rectangle. It accepts 2 arguments, the width and height, which we give it the game width
  pos(0, height() - 50),
  area(), // enables collision detection
  body({isStatic: true}),
  outline(4),
  color(127, 200, 255)
])

// load a sprite 'bean' from an image
loadSprite("bean", "assets/bean.png")

// add sprite to screen
const player = add([
    sprite("bean"),  // renders as a sprite
    pos(80, 40),    // position in world 
    area(), // gives it a collider area, so we can check for collisions with other characters
    body(), // gives it a physical body, making it fall due to gravity and ability to jump
])

// jump when player presses "space" key
onKeyPress("space", () => {
  if(player.isGrounded()){ // isGrounded() is another function provided by body() component which checks if currently landed on a platform.
    player.jump() // .jump() is provided by the body() component
  }  
})