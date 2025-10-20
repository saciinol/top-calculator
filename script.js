function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return x / y;
}

let num1;
let operator;
let num2;

function operate(x, op, y) {
	if (op === "+") {
		add(x, y);
	} else if (op === "-") {
		subtract(x, y);
	} else if (op === "*") {
		multiply(x, y);
	} else if (op === "/") {
		divide(x, y);
	} else {
		alert("Error");
	}
}

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

const buttonMap = {
	dotButton: ".",
	zeroButton: "0",
	oneButton: "1",
	twoButton: "2",
	threeButton: "3",
	fourButton: "4",
	fiveButton: "5",
	sixButton: "6",
	sevenButton: "7",
	eightButton: "8",
	nineButton: "9",
	leftParenthesisButton: "(",
	rightParenthesisButton: ")",
	addButton: "+",
	subtractButton: "-",
	multiplyButton: "*",
	divideButton: "/",
};

const actionMap = {
	CButton: () => (display.textContent = display.textContent.slice(0, -1)),
	ACButton: () => (display.textContent = ""),
	equalButton: () => operate(num1, operator, num2),
};

buttons.addEventListener("click", (e) => {
	const { id } = e.target;

	if (buttonMap[id]) {
		display.textContent += buttonMap[id];
	} else if (actionMap[id]) {
		actionMap[id]();
	}
});
