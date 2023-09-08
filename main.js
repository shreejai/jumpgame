import kaboom from "./libs/kaboom.mjs";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;

//Initialize kaboom
kaboom({
  //background: [51, 151, 255]
  background: [0, 0, 255]
})

// load a sprite 'bean' from an image
loadSprite("bean", "assets/bean.png")

scene("game", () => {

  let collisionCount = 4;

  // define gravity
  setGravity(1600);

  // add sprite to screen
  const player = add([
    sprite("bean"),  // renders as a sprite
    pos(80, 40),    // position in world 
    area(), // gives it a collider area, so we can check for collisions with other characters
    body(), // gives it a physical body, making it fall due to gravity and ability to jump
  ])

  //add a platform to avoid characters falling into oblivion
  add([
    rect(width(), FLOOR_HEIGHT), // renders a rectangle. It accepts 2 arguments, the width and height, we are using full width and a fixed height
    pos(0, height() - 50),
    area(), // enables collision detection
    body({isStatic: true}),
    outline(4),
    color(127, 200, 255),
  ])

  // jump when player presses "space" key
  onKeyPress("space", () => {
    if(player.isGrounded()){ // isGrounded() is another function provided by body() component which checks if currently landed on a platform.
      player.jump(JUMP_FORCE) // .jump() is provided by the body() component
    }  
  });

  function spawnTree() {
    // add tree object
    add([
      rect(48, rand(24, 64)),
      area(), //collision detection
      outline(4),
      pos(width(), height() - 48),
      anchor("botleft"), // defines origin point of position
      color(255, 180, 255),
      move(LEFT, 240), // makes it move infinitely at 240 pixels/second
      "tree" // add a tree tag, this helps to check for collision of player with an object with the tag "tree"
    ]);
    
    wait(rand(0.8, 3), spawnTree); // spawning trees at random intervals using rand()
  }
  
  // Start spawning trees
  spawnTree();

  // check if player collides with an object with tag -> "tree"
  player.onCollide("tree", () => { // onCollide() is provided by area()
    collisionCount--;
    livesLeft.text = collisionCount;
    addKaboom(player.pos);
    shake();
    burp();
    if(collisionCount < 2){ // 3 Lives
      player.opacity = 0.5;
    } 
    if(collisionCount < 1){ // 3 Lives
      go("lose", score); // go to lose scene here
    } 
  })

  add([
    sprite("bean"),
    pos(30, 34),
    scale(0.5)
  ])

  const livesLeft = add([
    text(collisionCount),
    anchor("topleft"),
    pos(80, 30)
  ])

  // keep track of score
  let score = 0;

  const scoreLabel = add([
    text("Score"+score),
    pos(30, 80)
  ])

  // increment score every frame
  onUpdate(() => {
    score++;
    scoreLabel.text = "Score: "+score;
  });

})


scene("lose", (score) => {

  add([
    sprite('bean'),
    pos(width() / 2, height() / 2 - 80),
    scale(2),
    anchor("center")
  ])

  add([
    text("Game Over!"),
    text("Score: "+score),
    pos(center()),
    anchor("center")
  ])

  add([
    text("Game Over!"),
    pos(width()/2, height()/ 2 - 160),
    anchor("center")
  ])

});

go("game");
