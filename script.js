function operate() {
	let displayArray = display.textContent.split(/([+\-*/])/);

	const operations = {
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		"*": (a, b) => a * b,
		"/": (a, b) => a / b,
	};

	function processOperator(op) {
		while (displayArray.includes(op)) {
			const index = displayArray.indexOf(op);
			const left = Number(displayArray[index - 1]);
			const right = Number(displayArray[index + 1]);

			if (op === "/" && right === 0) {
				display.textContent = "Bruh no";
				return false;
			}

			const result = operations[op](left, right);
			displayArray.splice(index - 1, 3, result);
		}
		return true;
	}

	while (displayArray.includes("*") || displayArray.includes("/")) {
		const multIndex = displayArray.indexOf("*");
		const divIndex = displayArray.indexOf("/");

		if (divIndex === -1 || (multIndex !== -1 && multIndex < divIndex)) {
			if (!processOperator("*")) return;
		} else {
			if (!processOperator("/")) return;
		}
	}

	while (displayArray.includes("+") || displayArray.includes("-")) {
		const addIndex = displayArray.indexOf("+");
		const subIndex = displayArray.indexOf("-");

		if (subIndex === -1 || (addIndex !== -1 && addIndex < subIndex)) {
			if (!processOperator("+")) return;
		} else {
			if (!processOperator("-")) return;
		}
	}

	if (display.textContent !== "Bruh no") {
		display.textContent = displayArray[0];
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

let justCalculated = false;

const actionMap = {
	CButton: () => (display.textContent = display.textContent.slice(0, -1)),
	ACButton: () => (display.textContent = ""),
	equalButton: () => {
		operate();
		justCalculated = true;
	},
};

buttons.addEventListener("click", (e) => {
	const { id } = e.target;
	const value = buttonMap[id];

	if (value) {
		const isOperator = /[+\-*/]/.test(value);
		const isNumber = /[0-9]/.test(value);
		const lastChar = display.textContent.slice(-1);

		if (justCalculated) {
			if (isNumber) {
				display.textContent = value;
			} else if (isOperator) {
				if (/[+\-*/]/.test(lastChar)) return;

				display.textContent += value;
			}
			justCalculated = false;
		} else {
			if (isOperator && /[+\-*/]/.test(lastChar)) return;
         if (value === "." && /\.\d*$/.test(display.textContent)) return;
			display.textContent += value;
		}
	} else if (actionMap[id]) {
		actionMap[id]();
	}
});
