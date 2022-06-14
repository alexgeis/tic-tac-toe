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
	if (newTurn === "computer") computerTurn();
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

const gameSquares = gameboardEl.children;
console.log(gameboardEl.children);
console.log(gameSquares);
const gameSquaresArr = [...gameSquares];
console.log(gameSquaresArr);
gameboardEl.addEventListener("click", selectBox);

function selectBox(event) {
	let element = event.target;
	let ticDivs = [...element.parentElement.children];
	if (element.textContent !== "") return;
	for (let i = 0; i < ticDivs.length; i++) {
		// if (ticDivs[i].classlist.contains("selected")) {}
		ticDivs[i].classList.remove("selected", "comp-selected");
	}
	element.classList.toggle("selected");

	element.textContent = "X";
	setCurrentTurn("computer");
}

const clearBtn = document.querySelector("#clear-board");
clearBtn.addEventListener("click", clearBoard);

function clearBoard() {
	for (let i = 0; i < [...gameboardEl.children].length; i++) {
		const element = [...gameboardEl.children][i];
		element.classList.remove("selected");
		element.textContent = "";
	}
}

function computerTurn() {
	let randoNum = Math.floor(Math.random() * 9);
	if ([...gameboardEl.children][randoNum].textContent !== "") computerTurn();

	const compTurnTimer = setTimeout(() => {
		[...gameboardEl.children][randoNum].classList.add("comp-selected");
		[...gameboardEl.children][randoNum].textContent = "O";
		setCurrentTurn("player");
		clearInterval(compTurnTimer);
	}, 1000);
}
window.onload = () => {
	renderGameboard();
	// setupGrid(DEFAULT_SIZE);
	// activateButton(DEFAULT_MODE);
	// colorPicker.value = savedColor;
};
