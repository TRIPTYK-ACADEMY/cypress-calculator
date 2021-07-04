import React, { useEffect, useReducer } from 'react';
const calcReducer = (currentState, newState) => {
    return { ...currentState, ...newState }
}

const operations = {
    '+':(prevValue, nextValue)=> prevValue + nextValue,
    '-':(prevValue, nextValue)=> prevValue - nextValue,
    '*':(prevValue, nextValue)=> prevValue * nextValue,
    '/':(prevValue, nextValue)=> prevValue / nextValue,
    '=':(prevValue, nextValue)=> nextValue
}

const Calculator = () => {
    const [state, setState] = useReducer(calcReducer, {
        displayValue: '0',
        value:null,
        operator:null,
        waitingForOperand:false
    })
    const { displayValue, value, operator,waitingForOperand} = state;

    //events
    const inputDigit = (digit) => {
        if(waitingForOperand){
            setState({
                displayValue:String(digit),
                waitingForOperand:false
            })
        } else{
            setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit
            })
        }
       
    }

    const inputDot = () =>{
        if(!/\./.test(displayValue)){
            setState({
                displayValue: `${displayValue}.`
            })
        }

    }

    const inputPercent= ()=>{
        const currentValue =  parseFloat(displayValue);
        if(currentValue ===0)return;
        const fixedDigits = displayValue.replace(/^-?\d*\.?/,'');
        const newValue = parseFloat(displayValue) / 100;
        setState({displayValue:String(newValue.toFixed(fixedDigits.length+2))})
    }
    const performOperation = (nextOperator)=>{
        const inputValue = parseFloat(displayValue);
        if(value === null){
            setState({
                value:inputValue
            })
        } else if(operator){
            const currentValue = value ||0;
            const newValue = operations[operator](currentValue,inputValue);
            setState({
                value:newValue,
                displayValue:String(newValue)
            })
        }
        setState({
            operator:nextOperator,
            waitingForOperand:true
        })
    }

    const clearAll = ()=>{
        setState({
            displayValue: '0',
            value:null,
            operator:null,
            waitingForOperand:false
        })
    }
    const clearLastChar = ()=>{
        setState({
            displayValue:displayValue.substring(0,displayValue.length -1) || '0'
        })
    }

    const handleKeyDown = (e)=>{
        e.preventDefault();
        let {key} = e;
        console.log(key);
        if(key==='Enter') key="=";
        if(!isNaN(key)){
            inputDigit(parseInt(key,10))
        }else if(key in operations){
            performOperation(key);
        } else if(key === 'Delete'){
            clearAll();
        } else if( key ==='.' || key ===","){
            inputDot();
        } else if(key === 'Backspace'){
            clearLastChar();
        }

    }

    useEffect(()=>{
       document.addEventListener('keydown',handleKeyDown)
       return ()=>document.removeEventListener('keydown',handleKeyDown)
    })
    return (
        <div className="w-64">
            <p data-testid="display" className="w-full border border-2-white bg-black text-green-400 text-right text-4xl px-2">
                {displayValue}
            </p>
            <p className="flex">
                <button data-testid="1" onClick={()=>inputDigit(1)} type="button" className="calculator-primary-btn">1</button>
                <button data-testid="2" onClick={()=>inputDigit(2)} type="button" className="calculator-primary-btn">2</button>
                <button data-testid="3" onClick={()=>inputDigit(3)} type="button" className="calculator-primary-btn">3</button>
                <button data-testid="+" onClick={()=>performOperation('+') } type="button" className="calculator-secondary-btn">
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg></button>
            </p>
            <p className="flex">
                <button data-testid="4" onClick={()=>inputDigit(4)} type="button" className="calculator-primary-btn">4</button>
                <button data-testid="5" onClick={()=>inputDigit(5)} type="button" className="calculator-primary-btn">5</button>
                <button data-testid="6" onClick={()=>inputDigit(6)} type="button" className="calculator-primary-btn">6</button>
                <button data-testid="-" onClick={()=>performOperation('-') } type="button" className="calculator-secondary-btn">
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                        />
                    </svg></button>
            </p>
            <p className="flex">
                <button data-testid="7" onClick = {()=> inputDigit(7)} type="button" className="calculator-primary-btn">7</button>
                <button data-testid="8" onClick = {()=> inputDigit(8)} type="button" className="calculator-primary-btn">8</button>
                <button data-testid="9" onClick = {()=> inputDigit(9)} type="button" className="calculator-primary-btn">9</button>
                <button data-testid="/" onClick={()=>performOperation('/') } type="button" className="calculator-secondary-btn">
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                        />
                    </svg></button>
            </p>
            <p className="flex">
                <button data-testid="C" onClick={()=> clearAll()} type="button" className="calculator-primary-btn">C</button>
                <button data-testid="0" onClick={()=>inputDigit(0)} type="button" className="calculator-primary-btn">0</button>
                <button data-testid="." onClick={()=>inputDot()} type="button" className="calculator-primary-btn">.</button>
                <button data-testid="*" onClick={()=>performOperation('*') } type="button" className="calculator-secondary-btn">
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg></button>
            </p>
            <p className="flex">
                <span className="calculator-primary-btn"></span>
                <span className="calculator-primary-btn"></span>
                <button data-testid="%" onClick={()=>inputPercent()}type="button" className="calculator-primary-btn">%</button>
                <button data-testid="=" onClick={()=>performOperation('=') } type="button" className="calculator-primary-btn">=</button>
            </p>

        </div>

    )
}

export default Calculator;