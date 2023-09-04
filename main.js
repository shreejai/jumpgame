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



// check if player collides with an object with tag -> "tree"
player.onCollide("tree", () => { // onCollide() is provided by area()
  addKaboom(player.pos);
  shake();
  burp();
})

loop(1, () => { // the first argument in loop is time is seconds
  // add tree
  add([
    rect(48, 64),
    area(), //collision detection
    outline(4),
    pos(width(), height() - 48),
    anchor("botleft"), // defines origin point of position
    color(255, 180, 255),
    move(LEFT, 240), // makes it move infinitely at 240 pixels/second
    "tree" // add a tree tag, this helps to check for collision of player with an object with the tag "tree"
  ])  
})