var screenWidth = document.body.offsetWidth;
function createDucks(count){
  var delay = 0;
  for (var i = 0; i < count; i++) {
    var duck = $('<img src="duck.png" class="duck" />');
    duck.css({
      left: Math.random(i * 100) + 'px',
      top: 50 * Math.random(i * 10) + '%'
    });
    duck.appendTo($('.container'));
    delay += 5000;
    var posX = screenWidth - Math.random(i * 100) + 'px';
    duck.hide().fadeIn(Math.random(i * 200)).animate({
      left: posX
    }, delay, function(){
      $(this).fadeOut();
    })
  }
}

$(function(){
  var duckCount = 3;
  createDucks(duckCount);
  var counter = 0;
  var misCounter = 0;
  var result = $('<h1 />').appendTo($('.container'));
  $(document).on('click', function(e){
    if($(e.target).hasClass('duck')) {
      counter++;
      $(e.target).css({opacity: 0});
    } else {
      misCounter++;
    }
    console.log(counter, misCounter);
    if(counter >= duckCount) {
      result.removeClass('losing').addClass('winning').text('You won!');
    } else if(misCounter >= counter) {
      result.removeClass('winning').addClass('losing').text('You lost!');
    }

  });
});
