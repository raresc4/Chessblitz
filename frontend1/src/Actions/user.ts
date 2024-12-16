import { User } from '../Types/User';

export const registerUser = async (name: string, password: string): Promise<boolean> => {
        const response = await fetch(`https://localhost:7003/api/users/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: name, Password: password })
        });
        const data = await response.json();
        console.log("Data : ", data);
        return data;
}