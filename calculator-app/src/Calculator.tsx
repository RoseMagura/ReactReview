import { useState } from 'react';
import { Button } from '@material-ui/core';

export const Calculator = () => {
    const [displayString, setDisplayString] = useState('0');
    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [operator, setOperator] = useState('');
    const [total, setTotal] = useState(0);
    const [consec, setConsec] = useState(0);
    const [negative, setNegative] = useState(false);

    const inputNum = (val: number) => {
        setConsec(0);
        if (val === 0 && displayString === '0') {
            return;
        } 
        if(operator === ''){
            if(negative){
                setDisplayString('-' + firstNum.concat(String(val)));
                setFirstNum('-' + firstNum.concat(String(val)));
                setNegative(false);
                return;
            }
            setDisplayString(firstNum.concat(String(val)));
            setFirstNum(firstNum.concat(String(val)));
        } else {
            if(negative){
                setDisplayString(firstNum + operator + '-' + secondNum.concat(String(val)))
                setSecondNum('-' + secondNum.concat(String(val)));
                return;
            }
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
        setNegative(false);
    }

    const addDecimal = () => {
        setConsec(0);
        if(operator === '' && !firstNum.includes('.')){
            setFirstNum(firstNum.concat('.'));
            setDisplayString(firstNum.concat('.'));
        } else if (!secondNum.includes('.')) {
            setSecondNum(secondNum.concat('.'));
            setDisplayString(firstNum + secondNum.concat('.'));
        }
    }

    const appendSymbol = (symbol: string) => {
        if(symbol !== '-') {
            setNegative(false);
        }
        if(consec > 0){
            if(symbol === '-'){
                setNegative(true);
                return;
            }
            setOperator(symbol);
            return;
        }
        if(operator !== ''){
            calculate();
        }
        displayString[displayString.length - 1] !== symbol 
            && setDisplayString(displayString + symbol);
        displayString[displayString.length - 1] !== symbol 
            && setOperator(symbol);    
        setConsec(consec + 1);
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
                setFirstNum(String(sum));
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
                setFirstNum(String(diff));
                break;
            case '*':
                if(firstNum === ''){
                    setTotal(0);
                    return;
                }
                const product = parseFloat(firstNum) * parseFloat(secondNum);
                setTotal(product);
                setDisplayString(String(product));
                setFirstNum(String(product));
                break;
            case '/':
                if(firstNum === ''){
                    setTotal(0);
                    return;
                }
                const quotient = parseFloat(firstNum) / parseFloat(secondNum);
                setTotal(quotient);
                setDisplayString(String(quotient));
                setFirstNum(String(quotient));
                break;
            default:
                alert('No operator selected');
                break;
        }
        setOperator('');
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
            <div>{firstNum} {operator} {secondNum} = {total}</div>
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