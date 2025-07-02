/** HomePage */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome! This is the Home Page</h1>
            <button onClick = {() => navigate('/admin')}>Start Game</button>
            <button onClick = {() => navigate('/join')}>Join Game</button>
        </div>
    );
}