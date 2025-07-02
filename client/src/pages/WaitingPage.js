/** Waiting page */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WaitingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome! This is the waiting Page</h1>
            <button onClick = {() => navigate('/Dance')}>Join</button>
        </div>
    );
}