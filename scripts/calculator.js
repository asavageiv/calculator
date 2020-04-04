const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const Operation = Object.freeze({
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
});

const OP_TO_FN = Object.freeze({
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
});

const OP_ORDER = Object.freeze(
    [Operation.MULTIPLY, Operation.DIVIDE, Operation.ADD, Operation.SUBTRACT]);

class Calculator {
  constructor() {
    this.display = '';
    this.inputs = [];
    this.startingNewNumber = true;
  }

  /**
   *
   * @param {string} digit
   */
  inputDigit(digit) {
    if (this.startingNewNumber) {
      this.display = '';
      this.startingNewNumber = false;
    }
    this.display += digit;
  }

  /**
   *
   * @param {Operation} operation
   */
  inputOperation(operation) {
    // If the last key the user hit was an operation, assume they made a mistake
    // and want the second operator;
    if (this.inputs.length > 0 &&
        this.startingNewNumber) {
      this.inputs.pop();
      this.inputs.push(operation);
      return;
    }
    this.inputs.push(Number(this.display));
    this.inputs.push(operation);
    this.startingNewNumber = true;
  }

  equals() {
    // TODO: check that the input is ready to be calculated
    this.inputs.push(Number(this.display));
    for (const operator of OP_ORDER) {
      let operatorIndex = this.inputs.indexOf(operator);
      while (operatorIndex > -1) {
        const a = this.inputs[operatorIndex - 1];
        const b = this.inputs[operatorIndex + 1];
        const result = OP_TO_FN[operator](a, b);
        this.inputs.splice(operatorIndex - 1, 3, result);
        operatorIndex = this.inputs.indexOf(operator);
      }
    }
    this.display = '' + this.inputs.pop();
    this.startingNewNumber = true;
  }

  getDisplay() {
    return this.display;
  }
}

module.exports = {
  Calculator,
  Operation,
};
