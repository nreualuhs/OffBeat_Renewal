/** JoinPage */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Join Page</h1>
            <button onClick = {() => navigate('/waiting')}>Join</button>
        </div>
    );
}