function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  const regexp = /\d+|\+|\-|\*|\/|\(|\)/g;
  const exprArr = expr.match(regexp);

  const operators = {
    "+": {
      priority: 1,
      action: (a, b) => a + b
    },
    "-": {
      priority: 1,
      action: (a, b) => a - b
    },
    "*": {
      priority: 2,
      action: (a, b) => a * b
    },
    "/": {
      priority: 2,
      action: (a, b) => a / b
    }
  };

  function calc(b, a, op) {
    return operators[op].action(a, b);
  }

  const numberStack = [];
  const operatorStack = [];

  for (let i = 0; i < exprArr.length; i++) {
    if (!isNaN(exprArr[i])) {
      numberStack.push(Number(exprArr[i]));
    }

    function addOperator() {
      if (!operatorStack.length) {
        operatorStack.push(exprArr[i]);
      } else if (
        operators[exprArr[i]].priority >
        operators[operatorStack[operatorStack.length - 1]].priority
      ) {
        operatorStack.push(exprArr[i]);
      } else {
        numberStack.push(
          calc(numberStack.pop(), numberStack.pop(), operatorStack.pop())
        );
        addOperator();
      }
    }

    if (exprArr[i] in operators) {
      addOperator();
    }
  }

  return calc(numberStack[1], numberStack[0], operatorStack[0]);
}

module.exports = {
  expressionCalculator
};
