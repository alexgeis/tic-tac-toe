//date
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();

//DEFAULTS
const userScore = localStorage.getItem("userScore");
const compScore = localStorage.getItem("compScore");
const gameTurn = localStorage.getItem("gameTurn");
const DEFAULT_TURN = gameTurn || "player";
const DEFAULT_USER_SCORE = userScore || 0;
const DEFAULT_COMP_SCORE = compScore || 0;
//state variables
let currentTurn = DEFAULT_TURN;
let currentUserScore = DEFAULT_USER_SCORE;
let currentCompScore = DEFAULT_COMP_SCORE;
let currentWinner = false;
//state update functions
function setCurrentTurn(newTurn) {
	// activateButton(newTurn);
	currentTurn = newTurn;
	localStorage.setItem("gameTurn", currentTurn);
	if (newTurn === "computer") computerTurn();
	else if (newTurn === "player") checkWin();
}
function setCurrentUserScore(newScore) {
	currentUserScore = newScore;
	// localStorage.setItem("userScore", newScore);
}
function setCurrentCompScore(newScore) {
	currentCompScore = newScore;
	// localStorage.setItem("compScore", newScore);
}

const gameboardEl = document.querySelector("#tic-toe-div");
const renderGameboard = () => {
	for (let i = 0; i < 9; i++) {
		const divEl = document.createElement("div");
		divEl.setAttribute("data-index", i);
		gameboardEl.appendChild(divEl);
	}
};

gameboardEl.addEventListener("click", selectBox);

function selectBox(event) {
	let element = event.target;
	let ticDivs = [...element.parentElement.children];
	if (element.textContent !== "") return;
	for (let i = 0; i < ticDivs.length; i++) {
		// if (ticDivs[i].classlist.contains("selected")) {}
		ticDivs[i].classList.remove("selected", "comp-selected");
	}
	element.classList.add("selected");

	element.textContent = "X";
	checkWin();
	setCurrentTurn("computer");
}

const clearBtn = document.querySelector("#clear-board");
clearBtn.addEventListener("click", clearBoard);

function clearBoard() {
	for (let i = 0; i < [...gameboardEl.children].length; i++) {
		const element = [...gameboardEl.children][i];
		element.classList.remove("selected", "comp-selected");
		element.textContent = "";
	}
	gameDisplay.textContent = ``;
	clearBtn.textContent = "CLEAR BOARD";
	currentWinner = false;
	gameboardEl.addEventListener("click", selectBox);
}

const generateNumber0to8 = () => Math.floor(Math.random() * 9);

function computerTurn() {
	//valide if someone has already won
	if (currentWinner === true) return;
	//validate if gameboard is full
	//if content exists, push to content array
	let contentArray = [...gameboardEl.children].filter(
		(x) => x.textContent === "X" || x.textContent === "O"
	);
	if (contentArray.length === 9) return;

	//validate if X or O already exists in targeted square
	let randoNum = generateNumber0to8();
	while ([...gameboardEl.children][randoNum].textContent !== "") {
		randoNum = generateNumber0to8();
	}

	const compTurnTimer = setTimeout(() => {
		[...gameboardEl.children][randoNum].classList.add("comp-selected");
		[...gameboardEl.children][randoNum].textContent = "O";
		checkWin();
		setCurrentTurn("player");
		clearTimeout(compTurnTimer);
	}, 400);
}

const userScoreDisplay = document.querySelector("#player-score");
const compScoreDisplay = document.querySelector("#comp-score");

const gameDisplay = document.querySelector("#game-display");
function checkWin() {
	if (
		//PLAYER VALIDATIONS
		//top row
		([...gameboardEl.children][0].textContent === "X" &&
			[...gameboardEl.children][1].textContent === "X" &&
			[...gameboardEl.children][2].textContent === "X") ||
		//top left diagonal
		([...gameboardEl.children][0].textContent === "X" &&
			[...gameboardEl.children][4].textContent === "X" &&
			[...gameboardEl.children][8].textContent === "X") ||
		//left column
		([...gameboardEl.children][0].textContent === "X" &&
			[...gameboardEl.children][3].textContent === "X" &&
			[...gameboardEl.children][6].textContent === "X") ||
		//middle row
		([...gameboardEl.children][3].textContent === "X" &&
			[...gameboardEl.children][4].textContent === "X" &&
			[...gameboardEl.children][5].textContent === "X") ||
		//middle column
		([...gameboardEl.children][1].textContent === "X" &&
			[...gameboardEl.children][4].textContent === "X" &&
			[...gameboardEl.children][7].textContent === "X") ||
		//top right diagonal
		([...gameboardEl.children][2].textContent === "X" &&
			[...gameboardEl.children][4].textContent === "X" &&
			[...gameboardEl.children][6].textContent === "X") ||
		//right column
		([...gameboardEl.children][2].textContent === "X" &&
			[...gameboardEl.children][5].textContent === "X" &&
			[...gameboardEl.children][8].textContent === "X") ||
		//bottom row
		([...gameboardEl.children][6].textContent === "X" &&
			[...gameboardEl.children][7].textContent === "X" &&
			[...gameboardEl.children][8].textContent === "X")
	) {
		currentWinner = true;
		gameDisplay.textContent = `You win hot stuff!`;
		currentUserScore++;
		setCurrentUserScore(currentUserScore);
		console.log({ currentUserScore });
		userScoreDisplay.textContent = `SCORE: ${currentUserScore}`;
		gameboardEl.removeEventListener("click", selectBox);
		clearBtn.textContent = "RESET BOARD";
		// return true;
	} else if (
		//COMPUTER VALIDATIONS
		//top row
		([...gameboardEl.children][0].textContent === "O" &&
			[...gameboardEl.children][1].textContent === "O" &&
			[...gameboardEl.children][2].textContent === "O") ||
		//top left diagonal
		([...gameboardEl.children][0].textContent === "O" &&
			[...gameboardEl.children][4].textContent === "O" &&
			[...gameboardEl.children][8].textContent === "O") ||
		//left column
		([...gameboardEl.children][0].textContent === "O" &&
			[...gameboardEl.children][3].textContent === "O" &&
			[...gameboardEl.children][6].textContent === "O") ||
		//middle row
		([...gameboardEl.children][3].textContent === "O" &&
			[...gameboardEl.children][4].textContent === "O" &&
			[...gameboardEl.children][5].textContent === "O") ||
		//middle column
		([...gameboardEl.children][1].textContent === "O" &&
			[...gameboardEl.children][4].textContent === "O" &&
			[...gameboardEl.children][7].textContent === "O") ||
		//top right diagonal
		([...gameboardEl.children][2].textContent === "O" &&
			[...gameboardEl.children][4].textContent === "O" &&
			[...gameboardEl.children][6].textContent === "O") ||
		//right column
		([...gameboardEl.children][2].textContent === "O" &&
			[...gameboardEl.children][5].textContent === "O" &&
			[...gameboardEl.children][8].textContent === "O") ||
		//bottom row
		([...gameboardEl.children][6].textContent === "O" &&
			[...gameboardEl.children][7].textContent === "O" &&
			[...gameboardEl.children][8].textContent === "O")
	) {
		currentWinner = true;
		gameDisplay.textContent = `Computer wins ya dingus!`;
		let updateCompScore = currentCompScore + 1;
		setCurrentCompScore(updateCompScore);
		compScoreDisplay.textContent = `SCORE: ${currentCompScore}`;
		gameboardEl.removeEventListener("click", selectBox);
		clearBtn.textContent = "RESET BOARD";
		// return false;
	} else if (
		// validate for ties
		([...gameboardEl.children][0].textContent === "O" ||
			[...gameboardEl.children][0].textContent === "X") &&
		([...gameboardEl.children][1].textContent === "O" ||
			[...gameboardEl.children][1].textContent === "X") &&
		([...gameboardEl.children][2].textContent === "O" ||
			[...gameboardEl.children][2].textContent === "X") &&
		([...gameboardEl.children][3].textContent === "O" ||
			[...gameboardEl.children][3].textContent === "X") &&
		([...gameboardEl.children][4].textContent === "O" ||
			[...gameboardEl.children][4].textContent === "X") &&
		([...gameboardEl.children][5].textContent === "O" ||
			[...gameboardEl.children][5].textContent === "X") &&
		([...gameboardEl.children][6].textContent === "O" ||
			[...gameboardEl.children][6].textContent === "X") &&
		([...gameboardEl.children][7].textContent === "O" ||
			[...gameboardEl.children][7].textContent === "X") &&
		([...gameboardEl.children][8].textContent === "O" ||
			[...gameboardEl.children][8].textContent === "X")
	) {
		gameDisplay.textContent = `It's a tie! Clear the board to play again.`;
	} else {
		return;
		// if (currentTurn === "player") setCurrentTurn("computer");
		// setCurrentTurn("player");
		// console.log("enter check win else");
	}
}

window.onload = () => {
	renderGameboard();
	const username = prompt("What's your name, buddy?");
	document.getElementById("player-name").textContent = username;
};
