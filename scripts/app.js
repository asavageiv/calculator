/*
The display should start out as a 0.
The display should update as the user enters digits from the calculator.
If the user presses an operator the display should remain the same until next
time the user enters a digit. At that time the display should update with that
new value.
The user can input an unlimited series of operators and numbers. When equals
is pressed, the operations should be evaluated according to PEMDAS.

*/
import {Calculator} from './calculator.js';


let calculator = new Calculator();

const onClickDigit = (e) => {
  calculator.inputDigit(e.target.id);
};

const values = [];
const onClickOperator = (e) => {
  const displayDiv = document.getElementById('display');
  values.push_back(new Number(displayDiv.textContent));
  values.push_back(OPERATORS[e.target.id]);
};

const onClickEquals = (e) => {
  calculator.equals();
};

for (let i = 0; i < 10; i++) {
  const number = document.getElementById(i);
  number.addEventListener('click', onClickDigit);
}
