/** InGameImpostor - during current game, this is for whoever the impostor is */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InGameImpostor() {
    const navigate = useNavigate();

    return (
        <h1>Welcome! This is the In game impostor page</h1>
    );
}