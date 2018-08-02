var numSquares = 6;
var colours = generateRandomColours(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColour = pickColour();
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function() {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = 3;
  colours = generateRandomColours(numSquares);
  pickedColour = pickColour();
  colourDisplay.textContent = pickedColour;
  // loop that generates colours for first three and hides last three
  for (var i = 0; i < squares.length; i++) {
    // checks if there is a next colour for the square
    if (colours[i]) {
      squares[i].style.backgroundColor = colours[i];
    } else {
      // hide bottom three by styling with none
      squares[i].style.display = "none";
    }
  }
});

hardBtn.addEventListener("click", function() {
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  colours = generateRandomColours(numSquares);
  pickedColour = pickColour();
  colourDisplay.textContent = pickedColour;
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colours[i];
    // styles last three back to block so they appear
    squares[i].style.display = "block";
  }
});

resetButton.addEventListener("click", function() {
  // generate all new colours
  colours = generateRandomColours(numSquares);
  // pick a new random colour from array
  pickedColour = pickColour();
  // change colour display to match new picked colour
  colourDisplay.textContent = pickedColour;
  // change colours of square
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colours[i];
  }
  // resets heading background
  h1.style.backgroundColor = "#232323";
});

colourDisplay.textContent = pickedColour;

for (var i = 0; i < squares.length; i++) {
  // add initial colours to squares
  squares[i].style.backgroundColor = colours[i];

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
