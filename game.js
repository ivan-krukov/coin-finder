var canvas;
var world = {
  tileSize: 16,
  height: 20,
  width: 20,
  images: {floor: new Image(), coins: new Image()},
  audio: {coins: new Audio()}
};

var player = {x: 5, y:5, image: new Image()};

var coins = [
  {x: 0, y: 0, collected: false},
  {x: 3, y: 17, collected: false},
  {x: 5, y: 10, collected: false},
  {x: 19, y: 19, collected: false}];

function main(canvasElement) {
  canvas = canvasElement;
  setup();
  world.images.coins.onload = draw;
}

function draw() {
  var ctx = canvas.getContext('2d');
  for (var y = 0; y < world.height; y ++) {
    for (var x = 0; x < world.width; x ++) {

      // Draw tiles
      ctx.drawImage(world.images.floor, x * world.tileSize, y * world.tileSize);

      // Draw coins
      for (var c = 0; c < coins.length; c++) {
        var coin = coins[c];
        if (player.x == coin.x && player.y == coin.y && !coin.collected) {
          world.audio.coins.play();
          coin.collected = true;
        }

        if (x == coin.x && y == coin.y && !coin.collected) {
          ctx.drawImage(world.images.coins, x * world.tileSize, y * world.tileSize);
        }
      }

      // Draw player
      if (x == player.x && y == player.y) {
        ctx.drawImage(player.image, x * world.tileSize, y * world.tileSize);
      }

    }
  }
}

function setup() {
  player.image.src = 'assets/knight.png';
  world.images.floor.src = 'assets/floor-tile.png';
  world.images.coins.src = 'assets/coins.png';

  world.audio.coins.src = 'assets/coins.ogg';
  // world.audio.coins.src = 'assets/handleCoins.ogg';

  document.onkeydown = function (event) {
    if (event.key == 'w' || event.key == 'ArrowUp') {
      moveUp();
    } else if (event.key == 'a' || event.key == 'ArrowLeft') {
      moveLeft();
    } else if (event.key == 's' || event.key == 'ArrowDown') {
      moveDown();
    } else if (event.key == 'd' || event.key == 'ArrowRight') {
      moveRight();
    } else {

    }
  };
}

// function edgeCollide() {
//   if (player.x == 0 || player.y == 0 || player.x == world.width - 1 || player.y == world.height - 1) {
//
//   }
// }

function moveUp() {
  player.y = player.y - 1;
  draw();
}

function moveLeft() {
  player.x = player.x - 1;
  draw();
}

function moveDown() {
  player.y = player.y + 1;
  draw();
}

function moveRight() {
  player.x = player.x + 1;
  draw();
}
