var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0 and 3
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++; // Increment the level

    // Update the h1 element with the new level value
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(event) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio();

    switch (name) {
        case "red":
            audio.src = "./sounds/red.mp3";
            break;
        case "blue":
            audio.src = "./sounds/blue.mp3";
            break;
        case "green":
            audio.src = "./sounds/green.mp3";
            break;
        case "yellow":
            audio.src = "./sounds/yellow.mp3";
            break;
        default:
            alert("Wrong Color!");
            return;
    }

    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000); 
        }
    }
    else {
        var wrong = new Audio();
        wrong.src = ("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}