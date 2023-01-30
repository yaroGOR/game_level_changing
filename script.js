const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let parsedCollisions;

let collisionBlocks;
let background;

let doors;

canvas.width = 64 * 16;
canvas.height = 64 * 9;
const player = new Player({
  imageSrc: "./img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",
      onComplete: () => {
        console.log("completed animation");
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
           

            if (level<3){
            level++;
            levels[level].init();
            player.preventInput = false;
            player.switchSprite('idleRight')
            gsap.to(overlay, {
                opacity:0
            })
        } else {level = 1
            levels[level].init();
            player.preventInput = false;
            player.switchSprite('idleRight')
            gsap.to(overlay, {
                opacity:0
            })}
          },
        });
      },
    },
  },
});

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();

      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./img/backgroundLevel1.png",
      });
      if(player.currentAnimation) player.currentAnimation.isActive = false

      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();

      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./img/backgroundLevel2.png",
      });
      player.position.x = 50
      player.position.y = 40
      if(player.currentAnimation) player.currentAnimation.isActive = false
      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 336,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();

      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./img/backgroundLevel3.png",
      });
      player.position.x = 680
      player.position.y = 100
      if(player.currentAnimation) player.currentAnimation.isActive = false

      doors = [
        new Sprite({
          position: {
            x: 180,
            y: 336,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
const overlay = {
  opacity: 0,
};
function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();
  ctx.save();
  ctx.globalAlpha = overlay.opacity;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
levels[level].init();
animate();
