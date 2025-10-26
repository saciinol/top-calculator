function operate() {
	let displayArray = display.textContent.split(/([+\-*/])/);

   const operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
   }

   function processOperator(op) {
      while (displayArray.includes(op)) {
         const index = displayArray.indexOf(op);
         const left = Number(displayArray[index - 1]);
         const right = Number(displayArray[index + 1]);
         const result = operations[op](left, right);
         displayArray.splice(index - 1, 3, result);
      }
   }

   while (displayArray.includes("*") || displayArray.includes("/")) {
      const multIndex = displayArray.indexOf("*");
      const divIndex = displayArray.indexOf("/");

      if (divIndex === -1 || (multIndex !== -1 && multIndex < divIndex)) {
         processOperator("*");
      } else {
         processOperator("/");
      }
   }

   while (displayArray.includes("+") || displayArray.includes("-")) {
      const addIndex = displayArray.indexOf("+");
      const subIndex = displayArray.indexOf("-");

      if (subIndex === -1 || (addIndex !== -1 && addIndex < subIndex)) {
         processOperator("+");
      } else {
         processOperator("-");
      }
   }

	display.textContent = displayArray[0];
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
	equalButton: () => operate(),
};

buttons.addEventListener("click", (e) => {
	const { id } = e.target;

	if (buttonMap[id]) {
		display.textContent += buttonMap[id];
	} else if (actionMap[id]) {
		actionMap[id]();
	}
});
