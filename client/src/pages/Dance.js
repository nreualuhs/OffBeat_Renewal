/* Dance page */
/** Waiting page */

import React, { useEffect, useState} from 'react';

export default function DancePage({textDisplay}) {

    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
        if(seconds > 0) {
            const timerId = setTimeout(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [seconds]);

    return (
        <div>
            <h1>Welcome! This is the Dancing Page</h1>
            {seconds > 0 ? (
                <>
                <h1>DANCE!</h1>
                <h1>{seconds}</h1>
                </>
            ) : (
                <h1>{textDisplay}</h1>
            )}
        </div>
    );
}