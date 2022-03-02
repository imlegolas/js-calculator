import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App()
{
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState(0);

  const display = (symbol) =>
  {
    //   setExpression(prev => prev + symbol)
    //  setAnswer(prev => prev + symbol)

    if (expression[expression.length - 1] === "=")
    {
      if (/[0-9.]/.test(symbol))
      {
        setExpression(symbol)
      } else
      {
        setExpression(answer + symbol);
      }
    }

    setExpression((prevValue) =>
    {
      if (
        /[+*-/]/.test(symbol) &&
        /[+*-/]/.test(prevValue[prevValue.length - 1])
      )
      {
        let newValue;
        if (/[-]/.test(symbol))
        {
          newValue = prevValue.slice(0, prevValue.length) + symbol;
        } else
        {
          let count = 0;
          for (let i = 0; i < prevValue.length; i++)
          {
            if (isNaN(+prevValue[i]))
            {
              count++;
            } else
            {
              count = 0;
            }
          }
          newValue = prevValue.slice(0, prevValue.length - count) + symbol;
        }

        setExpression(newValue);
      } else
      {
        if (prevValue)
        {
          prevValue = prevValue + "";
          let valArr = prevValue.split(/[+/*-]/g);
          console.log("valArr " + JSON.stringify(valArr));
          let lastNumber = valArr[valArr.length - 1];
          if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === ".")
          {
            console.log("symbol = empty ");
            symbol = "";
          }
        }

        setExpression(
          (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
      }
    });

    setAnswer((prevValue) =>
      (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
    );
  };

  const calculate = () =>
  {
    setAnswer(eval(expression));
    // setExpression(eval(expression));
    setExpression((prev) => prev + "=");
  }
  const allClear = () =>
  {
    setExpression("");
    setAnswer(0);
    //  setExpression(0);
  }
  const clear = () =>
  {
    setExpression(prev => prev.split("").slice(0, prev.length - 1).join(""));
    setAnswer(0);
    // setExpression(0);
  }

  return (
    <div className="App">
      <div className="grid">
        <div className="dis" >
          <input className="display-input" type="text" value={expression} placeholder="0" disabled></input>
          <input className="total" id="display" value={answer} disabled></input>
        </div>
        <div onClick={allClear} className="button AC" id="clear">AC</div>
        <div onClick={clear} className="button C" id="clears">C</div>
        <div onClick={() => display("/")} className="button divide" id="divide">/</div>
        <div onClick={() => display("*")} className="button multiply" id="multiply">x</div>
        <div onClick={() => display("7")} className="button seven numbers" id="seven">7</div>
        <div onClick={() => display("8")} className="button eight numbers" id="eight">8</div>
        <div onClick={() => display("9")} className="button nine numbers" id="nine">9</div>
        <div onClick={() => display("-")} className="button subtract" id="subtract">-</div>
        <div onClick={() => display("4")} className="button four numbers" id="four">4</div>
        <div onClick={() => display("5")} className="button five numbers" id="five">5</div>
        <div onClick={() => display("6")} className="button six numbers" id="six">6</div>
        <div onClick={() => display("+")} className="button plus" id="add">+</div>
        <div onClick={() => display("1")} className="button one numbers" id="one">1</div>
        <div onClick={() => display("2")} className="button two numbers" id="two">2</div>
        <div onClick={() => display("3")} className="button three numbers" id="three">3</div>
        <div onClick={calculate} className="button equal" id="equals">=</div>
        <div onClick={() => display("0")} className="button zero numbers" id="zero">0</div>
        <div onClick={() => display(".")} className="button decimal numbers" id="decimal">.</div>
      </div>


    </div>
  );
}

export default App;
