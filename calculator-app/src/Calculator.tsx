import { useState } from 'react';
import { Button } from '@material-ui/core';

export const Calculator = () => {
    const [currVal, setVal] = useState(0);
    const createGrid = () => {
        const items: any[] = [];
        for (let i = 0; i < 10; i++) {
            items.push(i);
        }
        return items;
    }
    const numGrid = createGrid();
    return (
        <div>
            <h2 id='display'>{currVal}</h2>
            <Button>AC</Button>
            <Button>/</Button>
            <Button>X</Button>
            {/* number grid here */}
            {numGrid}
            <Button>.</Button>
            <Button>-</Button>
            <Button>+</Button>
            <Button>=</Button>
        </div>
    )
}