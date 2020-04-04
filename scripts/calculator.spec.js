const {Calculator, Operation} = require('./calculator');

describe('Calculator', () => {
  it('2+2=4', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.equals();

    expect(calc.getDisplay()).toEqual('4');
  });

  it('2+2+2=6', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.equals();

    expect(calc.getDisplay()).toEqual('6');
  });

  it('2*4=8', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperation(Operation.MULTIPLY);
    calc.inputDigit('4');
    calc.equals();

    expect(calc.getDisplay()).toEqual('8');
  });

  it('2+2*4+2=12', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.inputOperation(Operation.MULTIPLY);
    calc.inputDigit('4');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.equals();

    expect(calc.getDisplay()).toEqual('12');
  });

  describe('inputting consecutive operators uses last one', () => {
    it('higher precedence operator last', () => {
      const calc = new Calculator();
      calc.inputDigit('2');
      calc.inputOperation(Operation.ADD);
      calc.inputOperation(Operation.MULTIPLY);
      calc.inputDigit('3');
      calc.equals();

      expect(calc.getDisplay()).toEqual('6');
    });

    it('lower precedence operator last', () => {
      const calc = new Calculator();
      calc.inputDigit('2');
      calc.inputOperation(Operation.MULTIPLY);
      calc.inputOperation(Operation.ADD);
      calc.inputDigit('3');
      calc.equals();

      expect(calc.getDisplay()).toEqual('5');
    });
  });

  it('equals on empty input does nothing', () => {
    const calc = new Calculator();
    calc.equals();

    expect(calc.getDisplay()).toEqual('0');
  });

  it('operator before any input does nothing', () => {
    const calc = new Calculator();
    calc.inputOperation(Operation.ADD);

    expect(calc.getDisplay()).toEqual('0');
  });
});
