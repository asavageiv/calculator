/*
The display should start out as a 0.
The display should update as the user enters digits from the calculator.
If the user presses an operator the display should remain the same until next
time the user enters a digit. At that time the display should update with that
new value.
The user can input an unlimited series of operators and numbers. When equals
is pressed, the operations should be evaluated according to PEMDAS.

*/
import {Calculator, Operation} from './calculator.js';

let calculator = new Calculator();

const ID_TO_OP = Object.freeze({
  'add': Operation.ADD,
  'subtract': Operation.SUBTRACT,
  'multiply': Operation.MULTIPLY,
  'divide': Operation.DIVIDE,
});

const updateDisplay = () => {
  document.getElementById('display').textContent = calculator.getDisplay();
  if (calculator.getDisplay().includes('.')) {
    document.getElementById('.').disabled = true;
  } else {
    document.getElementById('.').disabled = false;
  }
};

const onClickDigit = (e) => {
  calculator.inputDigit(e.target.id);
  updateDisplay();
};

const onClickOperator = (e) => {
  calculator.inputOperation(ID_TO_OP[e.target.id]);
  updateDisplay();
};

const onClickEquals = (e) => {
  calculator.equals();
  updateDisplay();
};

const onClickClear = (e) => {
  calculator = new Calculator();
  updateDisplay();
};

const onClickDecimal = () => {
  calculator.inputDecimal();
  updateDisplay();
};

for (let i = 0; i < 10; i++) {
  document.getElementById(i).addEventListener('click', onClickDigit);
}
for (const opId of Object.keys(ID_TO_OP)) {
  document.getElementById(opId).addEventListener('click', onClickOperator);
}
document.getElementById('equals').addEventListener('click', onClickEquals);
document.getElementById('clear').addEventListener('click', onClickClear);
document.getElementById('.').addEventListener('click', onClickDecimal);
