import React from "react";
import { useState } from "react";

import API from "../API";  // Cambia la ruta según la ubicación real de tu archivo API
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');  // Usamos como username
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

        // Validaciones básicas
        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);
        try {
            // Llamamos al método loginUser del API
            const data = await API.loginUser({ username: email, password });
            console.log('Usuario logueado:', data);

            setEmail('');
            setPassword('');
            setMessage(`¡Bienvenido, ${data.user.name}!`);
            setError('');
            localStorage.setItem('token', data.token);

            navigate('/');  // Redirige a home o donde desees
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {message && (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                    {message}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                    {errorMessage}
                </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800">
                Iniciar sesión
            </h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col space-y-4 mb-6">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"  // ✅ Cambiado: ya no vacío
                        id="email"
                        placeholder="Username"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"  // ✅ Cambiado: ya no vacío
                        id="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
                <div className="mt-2">
                    <input type="checkbox" name="Rememberme" id="Recuerdame" />
                    <label htmlFor="Recuerdame" className="ml-2">Recuérdame</label>
                </div>
                <p className="mt-4">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">Inicia sesión aquí</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
