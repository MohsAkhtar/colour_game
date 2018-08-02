var numSquares = 6;
var colours = [];
var pickedColour;
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  // mode button event listeners
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      // remove from both buttons selecteed first
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      // using ternary operator to switch between easy and hard
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);

      reset();
    });
  }
}

function setupSquares() {
  // square listeners
  for (var i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      // grab colour of picked square
      // "this" refers to item that was clicked on
      var clickedColour = this.style.backgroundColor;

      // compare colour to picked colour
      // CORRECT GUESS
      if (clickedColour === pickedColour) {
        // changes message above colours
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        // if guessed right all changeColours is
        // passed the correct colour
        changeColours(clickedColour);
        h1.style.backgroundColor = clickedColour;
      } else {
        // INCORRECT GUESS
        this.style.backgroundColor = "#232323";
        // changes message above colours
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  // generate all new colours
  colours = generateRandomColours(numSquares);
  // pick a new random colour from array
  pickedColour = pickColour();
  // change colour display to match new picked colour
  colourDisplay.textContent = pickedColour;
  // resets play again button
  resetButton.textContent = "New Colours";
  // change colours of square
  for (var i = 0; i < squares.length; i++) {
    if (colours[i]) {
      // checks if there is a next colour for the square
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colours[i];
    } else {
      // hide bottom three by styling with none
      squares[i].style.display = "none";
    }
  }
  // resets heading background
  h1.style.backgroundColor = "steelblue";
  // resets message content
  messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColours(colour) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // change all squares to match given colour
    squares[i].style.backgroundColor = colour;
  }
}

// Uses random number to pick a colour
function pickColour() {
  var random = Math.floor(Math.random() * colours.length);
  return colours[random];
}

// Function which generates num random colours
function generateRandomColours(num) {
  //make an array
  var arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random colour and push into array
    arr.push(randomColour());
  }
  // return that array
  return arr;
}

// The function which generates random colour
function randomColour() {
  // pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256); //256 as we are rounding down to max of 255
  // pick a "green" from 0 - 255
  var g = Math.floor(Math.random() * 256); // Math.floor rounds the number
  // pick a "blue" from 0 - 255
  var b = Math.floor(Math.random() * 256); // Math.random actually starts between 0 and 1 hence times by 256

  // rgb(r, g, b); returning string
  // Make sure spacing is correct or bug occurs where
  // matched string does not equal correct
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
