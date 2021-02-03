let level = 0;
let score = 0;
let highscore = getHighscore();
let started = false;
let gamePattern = [];
let userClickedPattern = [];

let buttonColours = ["green", "red", "yellow", "blue"];
let highscoreElem = document.getElementById("highscoreNumber");
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
		document.getElementById("start-btn").style.display = "none";
		nextSequence();
	}
}

$(document).on("keydown", startGame);
$(".game-btn").on("click", startGame);


$(".button").on("click", function () {
  if (!started) {

  } else {
    let userChosenColour = $(this).attr("id");
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
			}, 700);
		}
	} else {
		endGame();
	}
}

function nextSequence() {
	if (started) {
		userClickedPattern = [];
		level++;
		score++;
		$("#level-title").text("Level " + level);
		let randomNumber = Math.floor(Math.random() * 4);
		let randomChosenColour = buttonColours[randomNumber];
		gamePattern.push(randomChosenColour);
	
		$("#" + randomChosenColour)
			.fadeIn(100)
			.fadeOut(100)
			.fadeIn(100);
		playSound(randomChosenColour);
	} else {
		startOver();
	}
	
}

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function playAnimation(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 150);
}

function endGame() {
	(score - 1 > highscore) ? (highscore = score - 1) : highscore;
	highscoreElem.innerText = highscore;
	localStorage.setItem("Highscore", highscore);
	playSound("wrong");
	
	$("body").addClass("game-over");
	$("#level-title").text("Game Over! Taste drücken um neu zu starten!");
	
	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 200);
	startOver();
}

function startOver() {
	level = 0;
	score = 0;
	gamePattern = [];
	started = false;
	document.getElementById("start-btn").style.display = "block";
}
