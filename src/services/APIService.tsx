import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, SERVER_URL } from "../config/server";

export const login = async (username:string, password:string) => {
    const payload = {
        username,
        password
    };
    return await fetch(SERVER_URL + LOGIN_USER, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then((res) => res.json());
};

export const logout = async (authToken: string) => {
    return await fetch(SERVER_URL + LOGOUT_USER , {
        method: 'POST',
        headers: {
            Authorization: `Token ${authToken}`
        }
    }).then((res) => res.json()); 
};

export const register = async (username: string, email: string, password: string) => {
    const payload = {
        username,
        email,
        password
    };
    return await fetch(SERVER_URL + REGISTER_USER, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}