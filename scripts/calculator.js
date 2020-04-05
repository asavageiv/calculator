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
  ADD: {apply: add, precedence: 0},
  SUBTRACT: {apply: subtract, precedence: 0},
  MULTIPLY: {apply: multiply, precedence: 1},
  DIVIDE: {apply: divide, precedence: 1},
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
    console.log('operation', operation, this.inputs);
    // Ignore operators entered before any input
    if (this.inputs.length === 0 && this.isStartingNewNumber) {
      return;
    }
    // If the last key the user hit was an operation, assume they made a mistake
    // and want the second operator;
    if (this.inputs.length > 0 && this.isStartingNewNumber) {
      this.inputs.pop();
      this.inputs.push(operation);
      this.subtotal();
      console.log(this.inputs);
      return;
    }
    this.inputs.push(Number(this.display));
    this.inputs.push(operation);
    this.subtotal();
    this.isStartingNewNumber = true;
    console.log('end operation', this.inputs);
  }

  subtotal() {
    // If we don't have 4 inputs then we have at most one operation in the
    // queue with 2 operands.
    if (this.inputs.length < 4) {
      return;
    }
    // const currentOp = this.inputs.pop();

    // Get the current operator
    const newestOp = this.inputs[this.inputs.length - 1];
    // Find the previous operator, abort if there isn't one
    const prevOp = this.inputs[this.inputs.length - 3];
    // If the previous operator has greater or equal precedence then we are safe
    // to execute it with its operands and replace it with its result.
    if (prevOp.precedence >= newestOp.precedence) {
      const a = this.inputs[this.inputs.length - 4];
      const b = this.inputs[this.inputs.length - 2];
      const result = prevOp.apply(a, b);
      this.inputs.splice(this.inputs.length - 4, 3, result);
      this.display = '' + result;
    }
  }

  equals() {
    // TODO: check that the input is ready to be calculated
    this.inputs.push(Number(this.display));
    // TODO Ops of same precedence go LTR.
    for (const operator of OP_ORDER) {
      let operatorIndex = this.inputs.indexOf(operator);
      while (operatorIndex > -1) {
        const a = this.inputs[operatorIndex - 1];
        const b = this.inputs[operatorIndex + 1];
        const result = operator.apply(a, b);
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
