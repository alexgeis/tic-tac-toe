//date
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();

//DEFAULTS
const userScore = localStorage.getItem("userScore");
const compScore = localStorage.getItem("compScore");
const DEFAULT_COLOR = "#333" || savedColor;
const DEFAULT_USER_SCORE = 0;
const DEFAULT_COMP_SCORE = 0;

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
		ticDivs[i].classList.remove("selected");
	}
	element.classList.toggle("selected");
}
