/** AdminPage */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome! This is the admin Page. This is start where you select genre and give out code</h1>
            <div>
                <button>Pop</button>
                <button>Rock</button>
                <button>Musical</button>
            </div>
            <br></br>
            <div>
                <button onClick = {() => navigate('/waiting')}>Join</button>
            </div>
        </div>
    );
}