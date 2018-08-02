var colours = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)",
  "rgb(255, 0, 255)"
];

var squares = document.querySelectorAll(".square");

var pickedColour = pickColour();

var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.getElementById("message");

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
    if (clickedColour === pickedColour) {
      // changes message above colours
      messageDisplay.textContent = "Correct!";
      // if guessed right all changeColurs is
      // passed the correct colour
      changeColours(clickedColour);
    } else {
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
