import { User } from '../Types/User';

const API_URL = 'http://localhost:5276/api/users';

export const registerUser = async (name: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: name, Password: password })
        });

        if(!response.ok) {
            console.log("Error1 : ", response.statusText);
            return false;
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log("Error : ", error.message);
        return false;
    }
}

export const loginUser = async (name: string, password: string): Promise<String> => {

    

    try {
        const response = await fetch(`${API_URL}/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ Name: name, Password: password })
        });

        if(!response.ok) {
            console.log("Error1 : ", response.statusText);
            return "Error";
        }

        const data = await response.json();

        console.log("Data : ", data);

        return String(data);
    } catch (error) {
        console.log("Error : ", error.message);
        return "500";
    }
}

export const logoutUser = async (): Promise<boolean> => {

    const url = new URL(`${API_URL}/deleteCookie`);

    url.searchParams.append('key', 'token')

    try {
        const response = await fetch(url , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if(!response.ok) {
            console.log("Error1 : ", response.statusText);
            return false;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error : ", error.message);
        return false;
    }
}

export const getLoggedUsername = async (): Promise<string | boolean> => {
    
    try {
        const response = await fetch(`${API_URL}/getLoggedUsername`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if(!response.ok) {
            console.log("Error1 : ", response.statusText);
            return false;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error : ", error.message);
        return false;
    }
}