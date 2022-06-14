//date
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();

//DEFAULTS
const userScore = localStorage.getItem("userScore");
const compScore = localStorage.getItem("compScore");
const DEFAULT_COLOR = "#333" || savedColor;
const DEFAULT_USER_SCORE = 0 || userScore;
const DEFAULT_COMP_SCORE = 0 || compScore;

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
