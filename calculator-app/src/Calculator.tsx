import { useState } from 'react';
import { Button } from '@material-ui/core';

export const Calculator = () => {
    const [currVal, setVal] = useState(0);

    const inputNum = (val: number) => {
        currVal === 0
            ? setVal(val)
            : !(val === 0 && currVal === 0) && setVal(parseInt(currVal + String(val)));
    }

    const clearDisplay = () => {
        setVal(0);
    }

    const addDecimal = () => {
        console.log('adding decimal');
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
            <h2 id='display'>{currVal}</h2>
            <Button id='clear' onClick={clearDisplay}>AC</Button>
            <Button id='divide'>/</Button>
            <Button id='multiply'>X</Button>
            {numGrid}
            <Button id='decimal' onClick={addDecimal}>.</Button>
            <Button id='subtract'>-</Button>
            <Button id='add'>+</Button>
            <Button id='equals'>=</Button>
        </div>
    )
}