import kaboom from "./libs/kaboom.mjs";

//Initialize kaboom
kaboom()

// define gravity
//setGravity(2400)

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
    // .jump() is provided by the body() component
    player.jump()
})