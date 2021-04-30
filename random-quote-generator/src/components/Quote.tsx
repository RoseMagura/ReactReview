import { useState } from 'react';

export const Quote = () => {
    const quotes = [
        {
            "text": "Life isn’t about getting and having, it’s about giving and being.", "author": "Kevin Kruse"
        },
        {
            "text": "Whatever the mind of man can conceive and believe, it can achieve.", "author": "Napoleon Hill"
        },
        {
            "text": "Strive not to be a success, but rather to be of value.", "author": "Albert Einstein"
        },
        {
            "text": "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", "author": "Robert Frost"
        },
        {
            "text": "I attribute my success to this: I never gave or took any excuse.", "author": "Florence Nightingale"
        },
        {
            "text": "You miss 100% of the shots you don’t take.", "author": "Wayne Gretzky"
        }
    ];

    const generateRandomNum = () => Math.floor(quotes.length * Math.random());

    let randomIndex = generateRandomNum();

    const randomQuote = quotes[randomIndex];
    const [currQuote, setQuote] = useState(randomQuote);

    const pickNew = () => {
        randomIndex = generateRandomNum();
        // prevent repetition 
        while (quotes[randomIndex].text === currQuote.text) {
            randomIndex = generateRandomNum();
        }
        setQuote(quotes[randomIndex]);
    }

    return (
        <div id='quote-box'>
            <h2 id='text'>{currQuote.text}</h2>
            <h3 id='author'>{currQuote.author}</h3>

            <button>
                <a id='tweet-quote' href='https:/twitter.com/intent/tweet' target='_blank'>
                    Tweet
                </a>
            </button>

            <button id='new-quote' onClick={pickNew}>New Quote</button>

        </div>
    );

}