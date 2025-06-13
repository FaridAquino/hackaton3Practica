import axios from "axios"

const baseURL = 'http://localhost:8080/api'; // Reemplaza con la URL de tu API

export const llamaApi = axios.create({
    baseURL: baseURL, // Reemplaza con la URL de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

interface UserInterface {
    email: string;
    username: string;
    password: string;
    confirmPassword?: string; // Este campo es opcional, ya que no se envía al backend
}

export const registerUser = async (data : UserInterface ) => {
    try {
        const response = await llamaApi.post('auth/register', data); // endpoitn puedes cambiarlo a convenientcia
        // cómo enviar un mensaje a la consola para confirmar que se envió el registro
        console.log('Usuario registrado:', response.data);
        return response.data; // Devuelve la respuesta para confirmar que se envió.
    } catch (error) {
        console.error('Error al registrar usuarioxd:', error);
        throw error; // Lanza el error para que pueda ser manejado por quien llame a la función RegisterUser
        // al thrwo lanzar eror delegas el manejo del mismo :
    }
}

interface loginData {
    email: string;
    password: string;
}

export const loginUser = async (data: loginData) => {
    try {
        const response = await llamaApi.post('auth/login', data); // endpoint puedes cambiarlo a conveniencia
        console.log('Usuario logueado:', response.data);
        return response.data; // Devuelve la respuesta para confirmar que se envió.
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error; // Lanza el error para que pueda ser manejado por quien llame a la función loginUser
    }

}