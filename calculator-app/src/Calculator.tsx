import { useState } from 'react';
import { Button } from '@material-ui/core';

export const Calculator = () => {
    const [displayString, setDisplayString] = useState('0');
    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [operator, setOperator] = useState('');
    const [total, setTotal] = useState(0);

    const inputNum = (val: number) => {
        if (val === 0 && displayString === '0') {
            console.log('duplicate zeroes');
            return;
        } 
        if(operator === ''){
            console.log('setting first number');
            setDisplayString(firstNum.concat(String(val)));
            setFirstNum(firstNum.concat(String(val)));
        } else {
            console.log('setting second num');
            setDisplayString(firstNum + operator + secondNum.concat(String(val)))
            setSecondNum(secondNum.concat(String(val)));
        }
    }

    const clearDisplay = () => {
        setDisplayString('0');
        setOperator('');
        setFirstNum('');
        setSecondNum('');
        setTotal(0);
    }

    const addDecimal = () => {
        if(operator === '' && !firstNum.includes('.')){
            setFirstNum(firstNum.concat('.'));
            setDisplayString(firstNum.concat('.'));
        } else if (!secondNum.includes('.')) {
            setSecondNum(secondNum.concat('.'));
            setDisplayString(firstNum + secondNum.concat('.'));
        }
    }

    const appendSymbol = (symbol: string) => {
        displayString[displayString.length - 1] !== symbol 
            && setDisplayString(displayString + symbol);
        displayString[displayString.length - 1] !== symbol 
            && setOperator(symbol);    
    }

    const calculate = () => {
        switch(operator){
            case '+':
                if(firstNum === ''){
                    const sum = 0 + parseFloat(secondNum);
                    setTotal(total + sum);
                    return;
                }
                const sum = parseFloat(firstNum) + parseFloat(secondNum);
                setTotal(sum);
                setDisplayString(String(sum));
                break;
            case '-':
                if(firstNum === ''){
                    const diff = 0 - parseFloat(secondNum);
                    setTotal(total - diff);
                    return;
                }
                const diff = parseFloat(firstNum) - parseFloat(secondNum);
                setTotal(diff);
                setDisplayString(String(diff));
                break;
            case '*':
                if(firstNum === ''){
                    setTotal(0);
                    return;
                }
                const product = parseFloat(firstNum) * parseFloat(secondNum);
                setTotal(product);
                setDisplayString(String(product));
                break;
            case '/':
                if(firstNum === ''){
                    setTotal(0);
                    return;
                }
                const quotient = parseFloat(firstNum) / parseFloat(secondNum);
                setTotal(quotient);
                setDisplayString(String(quotient));
                break;
            default:
                alert('No operator selected');
                break;
        }
        setOperator('');
        setFirstNum('');
        setSecondNum('');
    }

    const createGrid = () => {
        const numNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const items: JSX.Element[] = [];
        for (let i = 0; i < 10; i++) {
            items.push(
                <Button id={numNames[i]}
                    onClick={event => inputNum(i)} key={i}>
                    {i}
                </Button>
            );
        }
        return items;
    }

    const numGrid = createGrid();
    return (
        <div>
            <h2 id='display'>{displayString}</h2>
            <div>{total}</div>
            <Button id='clear' onClick={clearDisplay}>AC</Button>
            <Button id='divide' onClick={event => appendSymbol('/')}>/</Button>
            <Button id='multiply' onClick={event => appendSymbol('*')}>X</Button>
            {numGrid}
            <Button id='decimal' onClick={addDecimal}>.</Button>
            <Button id='subtract' onClick={event => appendSymbol('-')}>-</Button>
            <Button id='add' onClick={event => appendSymbol('+')}>+</Button>
            <Button id='equals' onClick={calculate}>=</Button>
        </div>
    )
}