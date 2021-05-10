import { useState } from 'react';
import { Button } from '@material-ui/core';

export const Calculator = () => {
    const [displayString, setDisplayString] = useState('0');
    const [calcArr, setCalcArr] = useState(['']);

    const inputNum = (val: number) => {
        displayString === '0'
            ? setDisplayString(String(val))
            : !(val === 0 && displayString === '0') && setDisplayString(displayString + String(val));
    }

    const clearDisplay = () => {
        setDisplayString('0');
    }

    const addDecimal = () => {
        const newVal = displayString + '.';
        !displayString.includes('.') && setDisplayString(newVal);
    }

    const appendSymbol = (symbol: string) => {
        displayString[displayString.length - 1] !== symbol && setDisplayString(displayString + symbol);
    }

    const calculate = () => {
        console.log('calculating', displayString);
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