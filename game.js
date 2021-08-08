
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
   if (!started) {

    $("#level-titl").text("Level" + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel1){
  if(gamePattern[currentLevel1]===userClickedPattern[currentLevel1]){
     console.log("success");


  if(gamePattern.length===userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()

  }
}



function nextSequence() {
  userClickedPattern=[];
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name1) {
  var audio = new Audio("sounds/"+name1+".mp3");
  audio.play();
}

function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");

   setTimeout(function(){
     $("#"+currentColour).removeClass("pressed");
   },100);
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
