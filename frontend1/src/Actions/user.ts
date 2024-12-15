import { User } from '../Types/User';

export const registerUser = async (name: string, password: string): Promise<User> => {
    try {
        const response = await fetch(`https://localhost:7003/api/users/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: name, password: password })
        });
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}