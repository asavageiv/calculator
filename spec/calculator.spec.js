import {Calculator, Operation} from '../scripts/calculator.js';

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

  it('2+2+ shows intermediate result', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);

    expect(calc.getDisplay()).toEqual('4');
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

  it('2.1+2.2 = 4.3', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputDecimal();
    calc.inputDigit('1');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('2');
    calc.inputDecimal();
    calc.inputDigit('2');
    calc.equals();

    expect(calc.getDisplay()).toEqual({
      asymmetricMatch: (actual) => {
        return Math.abs(Number(actual) - 4.3) < .01;
      },
    });
  });

  it('4/2*8=16', () => {
    const calc = new Calculator();
    calc.inputDigit('4');
    calc.inputOperation(Operation.DIVIDE);
    calc.inputDigit('2');
    calc.inputOperation(Operation.MULTIPLY);

    expect(calc.getDisplay()).toEqual('2');

    calc.inputDigit('8');
    calc.equals();

    expect(calc.getDisplay()).toEqual('16');
  });

  it('4-2*16/8+32/2=16', () => {
    const calc = new Calculator();
    calc.inputDigit('4');
    calc.inputOperation(Operation.SUBTRACT);
    calc.inputDigit('2');
    calc.inputOperation(Operation.MULTIPLY); // 4-2*

    expect(calc.getDisplay()).toEqual('2');

    calc.inputDigit('1');
    calc.inputDigit('6');
    calc.inputOperation(Operation.DIVIDE); // 4-2*16/ -> 4-32/

    expect(calc.getDisplay()).toEqual('32');

    calc.inputDigit('8');
    calc.inputOperation(Operation.ADD); // 4-32/8+ -> 4-4+ -> 0+

    expect(calc.getDisplay()).toEqual('0');

    calc.inputDigit('3');
    calc.inputDigit('2');
    calc.inputOperation(Operation.DIVIDE); // 0+32/

    expect(calc.getDisplay()).toEqual('32');

    calc.inputDigit('2');
    calc.equals(); // 0+32/2= -> 0+16= -> 16= -> '16'

    expect(calc.getDisplay()).toEqual('16');
  });

  it('2+4*-5=1 and shows 6 as intermediate value', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperation(Operation.ADD);
    calc.inputDigit('4');
    calc.inputOperation(Operation.MULTIPLY);
    calc.inputOperation(Operation.SUBTRACT);

    expect(calc.getDisplay()).toEqual('6');

    calc.inputDigit('4');
    calc.equals();

    expect(calc.getDisplay()).toEqual('2');
  });
});
