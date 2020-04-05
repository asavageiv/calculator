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
  EQUALS: {apply: (a) => a, precedence: 0, unary: true},
  ADD: {apply: add, precedence: 1},
  SUBTRACT: {apply: subtract, precedence: 1},
  MULTIPLY: {apply: multiply, precedence: 2},
  DIVIDE: {apply: divide, precedence: 2},
});

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
    } else {
      this.inputs.push(Number(this.display));
    }
    this.inputs.push(operation);
    this.subtotal();
    this.isStartingNewNumber = true;
  }

  subtotal() {
    // There are 3 cases to handle. Nothing in the input, 2 things in the input
    // with a unary operator, and 4 or more things in the input.
    if (this.inputs.length == 0) {
      return;
    }
    let initialLength;
    do {
      initialLength = this.inputs.length;
      const newestOp = this.inputs[this.inputs.length - 1];
      if (this.inputs.length == 2 && newestOp === Operation.EQUALS) {
        this.display = '' + newestOp.apply(this.inputs[0]);
        this.inputs.pop();
        this.inputs.pop();
      } else if (this.inputs.length > 2) {
        console.assert(this.inputs.length >= 4);
        const prevOp = this.inputs[this.inputs.length - 3];
        // If the previous operator has greater or equal precedence then we are
        // safe to execute it with its operands and replace it with its result.
        // Note that if the newest operator is "EQUALS", everything has greater
        // precedence so it will all be evaluated until we hit the case above.
        if (prevOp.precedence >= newestOp.precedence) {
          const a = this.inputs[this.inputs.length - 4];
          const b = this.inputs[this.inputs.length - 2];
          const result = prevOp.apply(a, b);
          this.inputs.splice(this.inputs.length - 4, 3, result);
          this.display = '' + result;
        }
      }
    } while (initialLength !== this.inputs.length);
  }

  equals() {
    this.inputs.push(Number(this.display));
    this.inputs.push(Operation.EQUALS);
    this.subtotal();
    this.isStartingNewNumber = true;
  }

  getDisplay() {
    return this.display;
  }
}

export {Calculator, Operation};
