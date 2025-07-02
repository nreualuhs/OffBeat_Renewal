/** EndGame */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EndGame() {
    const navigate = useNavigate();

    return (
        <h1>Welcome! This is the End page for normal players</h1>
    );
}