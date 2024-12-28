// frontend/src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/request-magic-link', { email });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Eroare la trimiterea link-ului.');
        }
    };

    return (
        <div>
            <h2>Autentificare Administrator</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Trimite Link Magic</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
