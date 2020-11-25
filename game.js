var level = 0;
var score = 0;
var highscore = getHighscore();

var started = false;

var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["green", "red", "yellow", "blue"];
const highscoreElem = document.getElementById("highscoreNumber");
highscoreElem.innerText = getHighscore();

function getHighscore() {
	if (localStorage.getItem("Highscore")) {
		return parseInt(localStorage.getItem("Highscore"));
	} else {
		return 0;
	}
}

function startGame() {
  if (!started) {
		$("#level-title").text("Level " + level);
		started = true;
		nextSequence();
	}
}

$(document).keydown(startGame);
$(".game-btn").click(startGame);


$(".button").click(function () {
  if (!started) {

  } else {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    playAnimation(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		score - 1 > highscore ? (highscore = score - 1) : console.log(highscore);
		highscoreElem.innerText = highscore;
		localStorage.setItem("Highscore", highscore);
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Taste drücken um neu zu starten!");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	score++;
	$("#level-title").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function playAnimation(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function startOver() {
	level = 0;
	score = 0;
	gamePattern = [];
	started = false;
}
