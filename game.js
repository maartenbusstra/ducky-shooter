// game config
var duckCount = 10;
// game state
var gameDone = false;
var ducks = [];
var ducksHit = 0;
var ducksFaded = 0;
// html elements & document values
var documentWidth = document.body.offsetWidth;
var container;
var result;


// ends the game if all ducks are hit (win), or any duck has faded without being hit (lose)
function maybeEndGame() {
  if (ducksHit >= duckCount) {
    gameDone = true;
    result.addClass('winning').text('You won!');
  } else if (ducksFaded > 0) {
    ducks.forEach(function(duck) {
      duck.remove();
    });
    gameDone = true;
    result.addClass('losing').text('You lost!');
  }
}


function createDuck() {
  if (gameDone) return;
  var duck = $('<img src="duck.png" class="duck" />');
  ducks.push(duck);

  // spread around 70% of the viewport
  duck.css({ top: 70 * Math.random() + '%' });
  duck.appendTo(container);
  duck.on('click', function() {
    ducksHit++;
    duck.remove();
    duck.removed = true;
    maybeEndGame();
  });
  duck.animate({ left: documentWidth }, 10000000 / documentWidth, function() {
    // duck is already hit & removed, game continues
    if (duck.removed) return;
    duck.remove();
    ducksFaded++;
    maybeEndGame();
  });
}


function createDucks(count) {
  for (var i = 0; i < count; i++) {
    var delay = (i + 1) * 1000;
    setTimeout(createDuck, delay);
  }
}


$(document).ready(function() {
  container = $('.container');
  result = $('<h1 />').appendTo(container);
  createDucks(duckCount);
});
