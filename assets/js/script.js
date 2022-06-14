//date
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();

//DEFAULTS
const userScore = localStorage.getItem("userScore");
const compScore = localStorage.getItem("compScore");
const gameTurn = localStorage.getItem("gameTurn");
const DEFAULT_TURN = "player" || gameTurn;
const DEFAULT_USER_SCORE = 0 || userScore;
const DEFAULT_COMP_SCORE = 0 || compScore;
//state variables
let currentTurn = DEFAULT_TURN;
let currentUserScore = DEFAULT_USER_SCORE;
let currentCompScore = DEFAULT_COMP_SCORE;
//state update functions
function setCurrentTurn(newTurn) {
	// activateButton(newTurn);
	currentTurn = newTurn;
	localStorage.setItem("gameTurn", currentTurn);
}
function setCurrentUserScore(newScore) {
	currentUserScore = newScore;
}
function setCurrentCompScore(newScore) {
	currentCompScore = newScore;
}

const gameboardEl = document.querySelector("#tic-toe-div");
const renderGameboard = () => {
	for (let i = 0; i < 9; i++) {
		const divEl = document.createElement("div");
		divEl.setAttribute("data-index", i);
		gameboardEl.appendChild(divEl);
	}
};
renderGameboard();

const gameSquares = gameboardEl.children;
const gameSquaresArr = [...gameSquares];
console.log(gameSquaresArr);
gameboardEl.addEventListener("click", selectBox);

function selectBox(event) {
	let element = event.target;
	let ticDivs = [...element.parentElement.children];
	console.log(element);
	for (let i = 0; i < ticDivs.length; i++) {
		// if (ticDivs[i].classlist.contains("selected")) {}
		ticDivs[i].classList.remove("selected");
	}
	element.classList.toggle("selected");

	element.textContent = "X";
}

const clearBtn = document.querySelector("#clear-board");
clearBtn.addEventListener("click", clearBoard);

function clearBoard() {
	for (let i = 0; i < gameSquaresArr.length; i++) {
		const element = gameSquaresArr[i];
		element.classList.remove("selected");
		element.textContent = "";
	}
}

window.onload = () => {
	// setupGrid(DEFAULT_SIZE);
	// activateButton(DEFAULT_MODE);
	// colorPicker.value = savedColor;
};
