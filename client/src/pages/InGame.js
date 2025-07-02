/** inGame */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InGame() {
    const navigate = useNavigate();

    return (
        <h1>Welcome! This is the in game for normal people page</h1>
    );
}