import React from "react";
import { useState } from "react";
import { loginUser } from "../api/api";
import { Link, useNavigate} from "react-router-dom"; // Para redirigir al usuario después del inicio de sesión

// llamando a postLogin interface

const LoginForm = () => {


    const [loading, setLoading] = useState(false); // Para manejar el estado de carga del botón
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Para manejar mensajes de éxito o error
    const [errorMessage, setError] = useState(''); // Para manejar errores
    
    const navigate = useNavigate(); // Para redirigir al usuario después del inicio de sesión
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;

        // Validaciones rudimentarias
        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        if (!email.includes('@')) {
            alert('Revise que su correo este bien escrito.');
            return;
        }

        setLoading(true); // Opcional: puedes mostrar un indicador de carga mientras se procesa el inicio de sesión
        try {
            const data = await loginUser({ email, password });
            console.log('Usuario logueado:', data);

            setEmail(''); // Limpia el campo de correo electrónico
            setPassword(''); // Limpia el campo de contraseña  
            setMessage('Inicio de sesión exitoso.'); // Mensaje de éxito
            setError(''); // Limpia cualquier mensaje de error previo
            setLoading(false); // Detiene el estado de carga después de iniciar sesión
            // Aquí puedes guardar el token o la información del usuario en el estado global o en localStorage si es necesario
            localStorage.setItem('token', data.token); // Guarda el token en localStorage (ajusta según tu API)
            

            navigate('/'); // Redirige al usuario a la página principal o a donde desees después del inicio de sesión
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setLoading(false); // Detiene el estado de carga si hay un error
            
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.'); // Mensaje de error
            setMessage(''); // Limpia cualquier mensaje de éxito previo
            
        } finally {
            setLoading(false); // Detiene el estado de carga después de intentar iniciar sesión
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
            <form onSubmit={handleSubmit} action="" className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col space-y-4 mb-6">
                    <input 
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    type="text" 
                    name=""
                    id=""
                    placeholder="Username" 
                    className="w-full p-2 border rounded"
    />  
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" name="" id="" placeholder="Password" 
                    className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" disabled={loading}

                 className="w-full py-2 px-4 rounded transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}">
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                
                <input type="checkbox" name="Rememberme" id="Recuerdame" />
                <p>
                    ¿No tienes una cuenta?
                    <Link to="/" className="text-blue-500 hover:underline">Inicia sesión aquí</Link>
                </p>            
            </form>
        </div>
    );
}

export default LoginForm;
//         {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
//         </button>
//     );
