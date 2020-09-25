import React from 'react';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      buffer: "",
      operatorsUsed: 0
    }
    this.clearClicked = this.clearClicked.bind(this);
    this.digitClicked = this.digitClicked.bind(this);   
    this.operatorClicked = this.operatorClicked.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  clearClicked = () => {
    this.setState( {display: "0", buffer: "", operatorsUsed: 0} );
  }
  operatorClicked(e) {
    let operator = e.target.innerText;  
    if (operator === "x") operator = "*";
    this.setState({display: this.state.display, buffer: this.state.buffer + operator, operatorsUsed: this.state.operatorsUsed+1});         
  }
  calculate() {
    let consecutiveOperatorsArr = this.state.buffer.match(/[+\-*/]{2,}/g);
    let consecutiveOperators = "";
    let sanitizedBuffer="";
    if (consecutiveOperatorsArr != null ) {
      consecutiveOperators = consecutiveOperatorsArr.join("");
      let lastOperator = consecutiveOperators.substring(consecutiveOperators.length-1,consecutiveOperators.length);
      if (lastOperator === "-") {
        lastOperator = consecutiveOperators.substring(consecutiveOperators.length-2,consecutiveOperators.length-1);
        consecutiveOperators = consecutiveOperatorsArr.join("").slice(0,-1);
      }
      sanitizedBuffer = this.state.buffer.replace(consecutiveOperators,lastOperator);
    } else {
      sanitizedBuffer = this.state.buffer;
    }
    let result = eval(sanitizedBuffer);
    result = parseFloat(result.toFixed(10));
    this.setState( {display: result, buffer: result, operatorUsed: false } );  
  }
  digitClicked = (e) => {
    let input = e.target.innerText;
    let displayed = this.state.display;
    if (input === '.' && /\./.test(displayed)) {
      console.log("too many decimals");
    } else {
      if (displayed != 0 ) {
        if (this.state.operatorsUsed > 0) {
          this.setState( (prev) => ({ display: input, buffer: prev.buffer.concat(input), operatorsUsed: 0 } ));
        } else {
          this.setState( (prev) => ({ display:prev.display.concat(input), buffer:prev.buffer.concat(input), operatorsUsed:0}));
        }
      } else {
        this.setState({ display: input, buffer: input, operatorsUsed: 0 });
      }
    }
  }  
  render() {
    return (
      <div id="container">
        <div className="row">
            <h1>ReactJS Calculator</h1>
        </div>        
        <div className="flex-container">
          <div className="row">
            <div id="display">{this.state.display}</div>
          </div>
          <div className="row">
            <div id="add"       onClick={this.operatorClicked}>+</div>      
            <div id="subtract"  onClick={this.operatorClicked}>-</div>          
            <div id="multiply"  onClick={this.operatorClicked}>x</div>  
            <div id="divide"    onClick={this.operatorClicked}>/</div>               
          </div>       
          <div className="row">
            <div id="seven" className="digits" onClick={this.digitClicked}>7</div>
            <div id="eight" className="digits" onClick={this.digitClicked}>8</div>      
            <div id="nine"  className="digits" onClick={this.digitClicked}>9</div>  
            <div id="clear" onClick={this.clearClicked}>AC</div>                 
          </div>
          <div className="row">
            <div id="four" className="digits" onClick={this.digitClicked}>4</div>
            <div id="five" className="digits" onClick={this.digitClicked}>5</div>      
            <div id="six"  className="digits" onClick={this.digitClicked}>6</div>  
            <div id="blank1" className="digits" ></div>     
          </div>    
          <div className="row">
            <div id="one"    className="digits" onClick={this.digitClicked}>1</div>  
            <div id="two"    className="digits" onClick={this.digitClicked}>2</div>      
            <div id="three"  className="digits" onClick={this.digitClicked}>3</div>
            <div id="equals" onClick={this.calculate}>=</div>                 
          </div> 
          <div className="row">
            <div id="blank2" className="digits" ></div>
            <div id="zero"    className="digits" onClick={this.digitClicked}>0</div>     
            <div id="decimal" className="digits" onClick={this.digitClicked}>.</div>  
            <div id="blank3" className="digits" ></div>             
          </div>   
        </div>
        <div id="footer">by: C.Fung</div>
      </div>
    )
  }
}

export default Calculator;
