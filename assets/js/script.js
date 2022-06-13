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
	let children = element.parentElement.children;
	let ticDivs = [...children];
	console.log(element);
	for (let i = 0; i < ticDivs.length; i++) {
		const box = ticDivs[i];
		box.classList.remove(".selected");
	}
	element.classList.toggle("selected");
}
