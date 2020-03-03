var squares = document.querySelectorAll(".square");
var colors = [];
var pickedColor = "";
var squaresNumber = 6;
var resetBtn = document.getElementById("resetBtn");
var pickedColorTxt = document.getElementById("pickedColorTxt");
var message = document.getElementById("message");
var header = document.getElementById("header");
var modeButtons = document.querySelectorAll(".mode");

function setupButtons(){
    resetBtn.addEventListener("click", reset);
    for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                squaresNumber = 3;
            } else if (this.textContent === "Medium"){
                squaresNumber = 6;
            } else if (this.textContent === "Hard"){
                squaresNumber = 9;
            }
			reset();
		});
	}
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b +")";
}

function generateColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function reset(){
    colors = generateColors(squaresNumber);
    pickedColor = pickColor();
    message.textContent = "";
    resetBtn.textContent = "Restart";
    header.style.backgroundColor = "#226699";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
    pickedColorTxt.innerHTML = pickedColor;
}

function setupSquares(){
    for (i = 0; i < squares.length; i++){
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if (clickedColor == pickedColor){
                changeColors(clickedColor);
                message.textContent = "You win!";
                resetBtn.textContent = "Play again?";
                header.style.backgroundColor = clickedColor;

            } else {
                console.log(clickedColor);
                console.log(pickedColor);
                this.style.background = "#232323";
                message.textContent = "Try again";
            }
        });
    }
}

function changeColors(color){
    for (i = 0; i < squaresNumber; i++){
        squares[i].style.background = color;
    }
}

function pickColor(){
    return colors[Math.floor(Math.random() * squaresNumber)]
}

function init(){
    reset();
    setupButtons();
    setupSquares();

}

init();
