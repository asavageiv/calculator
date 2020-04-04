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
    this.display = '0';
    this.inputs = [];
    this.isStartingNewNumber = true;
  }

  /**
   *
   * @param {string} digit
   */
  inputDigit(digit) {
    // If expecting a new number we should reset the display so we don't keep
    // appending to the old number. E.g. '24 + 2' should show '24' then '2'.
    if (this.isStartingNewNumber) {
      this.display = '';
      this.isStartingNewNumber = false;
    }
    this.display += digit;
  }

  inputDecimal() {
    if (this.isStartingNewNumber) {
      this.display = '0.';
      this.isStartingNewNumber = false;
    } else if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  /**
   *
   * @param {Operation} operation
   */
  inputOperation(operation) {
    // Ignore operators entered before any input
    if (this.inputs.length === 0 && this.isStartingNewNumber) {
      return;
    }
    // If the last key the user hit was an operation, assume they made a mistake
    // and want the second operator;
    if (this.inputs.length > 0 && this.isStartingNewNumber) {
      this.inputs.pop();
      this.inputs.push(operation);
      return;
    }
    this.inputs.push(Number(this.display));
    this.inputs.push(operation);
    this.isStartingNewNumber = true;
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
    this.isStartingNewNumber = true;
  }

  getDisplay() {
    return this.display;
  }
}

export {Calculator, Operation};
