// Classes
import { Velocity } from './classes/velocity';
import { Boundary } from './classes/boundary';
import { Player } from './classes/player';
import { Ghost } from './classes/ghost';
import { Pellet } from './classes/pellet';
import { PowerUp } from './classes/power-up';

// Images
import pipeHorizontal from './img/pipeHorizontal.png';
import pipeVertical from './img/pipeVertical.png';
import pipeCorner1 from './img/pipeCorner1.png';
import pipeCorner2 from './img/pipeCorner2.png';
import pipeCorner3 from './img/pipeCorner3.png';
import pipeCorner4 from './img/pipeCorner4.png';
import block from './img/block.png';
import capLeft from './img/capLeft.png';
import capRight from './img/capRight.png';
import capBottom from './img/capBottom.png';
import capTop from './img/capTop.png';
import pipeCross from './img/pipeCross.png';
import pipeConnectorTop from './img/pipeConnectorTop.png';
import pipeConnectorRight from './img/pipeConnectorRight.png';
import pipeConnectorBottom from './img/pipeConnectorBottom.png';
import pipeConnectorLeft from './img/pipeConnectorLeft.png';

// Get canvas object.
const canvas = document.querySelector('canvas') as HTMLCanvasElement;

// Set the canvas to the width of the device.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the 2d canvas context.
const c = canvas.getContext('2d') as CanvasRenderingContext2D;

// Setup the game
const scoreEl = document.querySelector('#scoreEl') as HTMLSpanElement;
let lastKey = '';
let score = 0;
const keys = {
  w: { pressed: false },
  s: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

// Create the map.
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', 'p', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', 'p', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3'],
];

function createImage(src: string) {
  const image = new Image();
  image.src = src;
  return image;
}

const pellets: Pellet[] = [];
const boundaries: Boundary[] = [];
const powerUps: PowerUp[] = [];
const ghosts: Ghost[] = [
  new Ghost(
    Boundary.staticWidth * 6 + Boundary.staticWidth / 2,
    Boundary.staticHeight + Boundary.staticHeight / 2,
    Ghost.speed,
    0
  ),
  new Ghost(
    Boundary.staticWidth * 6 + Boundary.staticWidth / 2,
    Boundary.staticHeight * 3 + Boundary.staticHeight / 2,
    Ghost.speed,
    0,
    'PaleVioletRed'
  ),
  new Ghost(
    Boundary.staticWidth * 7 + Boundary.staticWidth / 2,
    Boundary.staticHeight * 7 + Boundary.staticHeight / 2,
    Ghost.speed,
    0,
    'Coral'
  ),
  new Ghost(
    Boundary.staticWidth * 5 + Boundary.staticWidth / 2,
    Boundary.staticHeight * 4 + Boundary.staticHeight / 2,
    Ghost.speed,
    0,
    'DodgerBlue'
  ),
];

// Create the player.
const player: Player = new Player(
  Boundary.staticWidth * 5 + Boundary.staticWidth / 2,
  Boundary.staticHeight * 8 + Boundary.staticHeight / 2,
  0,
  0
);

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeHorizontal)
          )
        );
        break;
      case '|':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeVertical)
          )
        );
        break;
      case '1':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeCorner1)
          )
        );
        break;
      case '2':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeCorner2)
          )
        );
        break;
      case '3':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeCorner3)
          )
        );
        break;
      case '4':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeCorner4)
          )
        );
        break;
      case 'b':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(block)
          )
        );
        break;
      case '[':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(capLeft)
          )
        );
        break;
      case ']':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(capRight)
          )
        );
        break;
      case '_':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(capBottom)
          )
        );
        break;
      case '^':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(capTop)
          )
        );
        break;
      case '+':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeCross)
          )
        );
        break;
      case '5':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeConnectorTop)
          )
        );
        break;
      case '6':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeConnectorRight)
          )
        );
        break;
      case '7':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeConnectorBottom)
          )
        );
        break;
      case '8':
        boundaries.push(
          new Boundary(
            Boundary.staticWidth * j,
            Boundary.staticHeight * i,
            createImage(pipeConnectorLeft)
          )
        );
        break;
      case '.':
        pellets.push(
          new Pellet(
            j * Boundary.staticWidth + Boundary.staticWidth / 2,
            i * Boundary.staticHeight + Boundary.staticHeight / 2
          )
        );
        break;
      case 'p':
        powerUps.push(
          new PowerUp(
            j * Boundary.staticWidth + Boundary.staticWidth / 2,
            i * Boundary.staticHeight + Boundary.staticHeight / 2
          )
        );
        break;
    }
  });
});

function circleCollidesWithRectangle(
  circle: Player | Ghost,
  rectangle: Boundary
) {
  const topSideOfCircle = circle.position.y - circle.radius;
  const bottomSideOfRectangle = rectangle.position.y + rectangle.height;
  const rightSideOfCircle = circle.position.x + circle.radius;
  const leftSideOfRectangle = rectangle.position.x;
  const topSideOfRectangle = rectangle.position.y;
  const bottomSideOfCircle = circle.position.y + circle.radius;
  const leftSideOfCircle = circle.position.x - circle.radius;
  const rightSideOfRectangle = rectangle.position.x + rectangle.width;
  const padding = Boundary.staticWidth / 2 - circle.radius - 1;

  return (
    topSideOfCircle + circle.velocity.y <= bottomSideOfRectangle + padding &&
    rightSideOfCircle + circle.velocity.x >= leftSideOfRectangle - padding &&
    bottomSideOfCircle + circle.velocity.y >= topSideOfRectangle - padding &&
    leftSideOfCircle + circle.velocity.x <= rightSideOfRectangle + padding
  );
}

let animationId;
function animate() {
  animationId = window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if (keys.w.pressed && lastKey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const playerCopy = JSON.parse(JSON.stringify(player)) as Player;
      playerCopy.velocity = new Velocity(0, -5);
      if (circleCollidesWithRectangle(playerCopy, boundaries[i])) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const playerCopy = JSON.parse(JSON.stringify(player)) as Player;
      playerCopy.velocity = new Velocity(-5, 0);
      if (circleCollidesWithRectangle(playerCopy, boundaries[i])) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if (keys.s.pressed && lastKey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const playerCopy = JSON.parse(JSON.stringify(player)) as Player;
      playerCopy.velocity = new Velocity(0, 5);
      if (circleCollidesWithRectangle(playerCopy, boundaries[i])) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const playerCopy = JSON.parse(JSON.stringify(player)) as Player;
      playerCopy.velocity = new Velocity(5, 0);
      if (circleCollidesWithRectangle(playerCopy, boundaries[i])) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }

  // Detect colision between ghosts & player
  for (let i = ghosts.length - 1; 0 <= i; i--) {
    const ghost = ghosts[i];

    // Ghost touches player
    const hypot = Math.hypot(
      ghost.position.x - player.position.x,
      ghost.position.y - player.position.y
    );
    const radius = ghost.radius + player.radius;
    if (hypot < radius) {
      if (ghost.scared) {
        ghosts.splice(i, 1);
      } else {
        cancelAnimationFrame(animationId);
      }
    }
  }

  // Win condition goes here
  if (pellets.length === 0) {
    cancelAnimationFrame(animationId);
  }

  // Power ups go
  for (let i = powerUps.length - 1; 0 <= i; i--) {
    const powerUp = powerUps[i];
    powerUp.draw(c);

    const hypot = Math.hypot(
      powerUp.position.x - player.position.x,
      powerUp.position.y - player.position.y
    );
    const radius = powerUp.radius + player.radius;
    if (hypot < radius) {
      powerUps.splice(i, 1);

      ghosts.forEach((ghost) => {
        ghost.scared = true;
        setTimeout(() => {
          ghost.scared = false;
        }, 5000);
      });
    }
  }

  // Touch pellets here
  for (let i = pellets.length - 1; 0 <= i; i--) {
    const pellet = pellets[i];
    pellet.draw(c);

    const hypot = Math.hypot(
      pellet.position.x - player.position.x,
      pellet.position.y - player.position.y
    );
    const radius = pellet.radius + player.radius;
    if (hypot < radius) {
      pellets.splice(i, 1);
      score += 10;
      scoreEl.innerHTML = `${score}`;
    }
  }

  boundaries.forEach((boundary) => {
    boundary.draw(c);

    if (circleCollidesWithRectangle(player, boundary)) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update(c);

  ghosts.forEach((ghost) => {
    ghost.update(c);

    const collisions: string[] = [];
    boundaries.forEach((boundary) => {
      const ghostCopy = JSON.parse(JSON.stringify(ghost)) as Ghost;

      if (!collisions.includes('right')) {
        ghostCopy.velocity = new Velocity(ghost.speed, 0);
        if (circleCollidesWithRectangle(ghostCopy, boundary)) {
          collisions.push('right');
        }
      }

      if (!collisions.includes('left')) {
        ghostCopy.velocity = new Velocity(-ghost.speed, 0);
        if (circleCollidesWithRectangle(ghostCopy, boundary)) {
          collisions.push('left');
        }
      }

      if (!collisions.includes('up')) {
        ghostCopy.velocity = new Velocity(0, -ghost.speed);
        if (circleCollidesWithRectangle(ghostCopy, boundary)) {
          collisions.push('up');
        }
      }

      if (!collisions.includes('down')) {
        ghostCopy.velocity = new Velocity(0, ghost.speed);
        if (circleCollidesWithRectangle(ghostCopy, boundary)) {
          collisions.push('down');
        }
      }
    });

    if (collisions.length > ghost.prevCollisions.length) {
      ghost.prevCollisions = collisions;
    }

    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      if (ghost.velocity.x > 0) {
        ghost.prevCollisions.push('right');
      } else if (ghost.velocity.x < 0) {
        ghost.prevCollisions.push('left');
      } else if (ghost.velocity.y < 0) {
        ghost.prevCollisions.push('up');
      } else if (ghost.velocity.y > 0) {
        ghost.prevCollisions.push('down');
      }

      const pathways = ghost.prevCollisions.filter((collision) => {
        return !collisions.includes(collision);
      });

      const direction = pathways[Math.floor(Math.random() * pathways.length)];
      switch (direction) {
        case 'down':
          ghost.velocity.y = ghost.speed;
          ghost.velocity.x = 0;
          break;
        case 'up':
          ghost.velocity.y = -ghost.speed;
          ghost.velocity.x = 0;
          break;
        case 'right':
          ghost.velocity.y = 0;
          ghost.velocity.x = ghost.speed;
          break;
        case 'left':
          ghost.velocity.y = 0;
          ghost.velocity.x = -ghost.speed;
          break;
      }

      ghost.prevCollisions = [];
    }
  });

  if (player.velocity.x > 0) {
    player.rotation = 0;
  } else if (player.velocity.x < 0) {
    player.rotation = Math.PI;
  } else if (player.velocity.y > 0) {
    player.rotation = Math.PI / 2;
  } else if (player.velocity.y < 0) {
    player.rotation = Math.PI * 1.5;
  }
}

animate();

window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
});

window.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});
