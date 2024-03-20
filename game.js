var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keypress", function() {
  if (!started) {
    document.querySelector("#level-title").innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

var btn = document.querySelectorAll(".btn");

for(var i = 0; i < btn.length; i++)
{
  btn[i].addEventListener("click", function() {

    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  });
}

function checkAnswer(currentLevel) 
{

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else 
    {
      playSound("wrong");
      document.querySelector("body").classList.add("game-over");
      document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";

      setTimeout(function () {
        document.querySelector("body").classList.remove("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() 
{
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").innerHTML = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  document.querySelector("#" + randomChosenColour).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + randomChosenColour).classList.remove("pressed");
  }, 100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) 
{
  document.querySelector("#" + currentColor).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100);
}

function playSound(name) 
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() 
{
  level = 0;
  gamePattern = [];
  started = false;
}
