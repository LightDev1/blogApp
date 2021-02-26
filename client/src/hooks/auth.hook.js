import { useCallback, useState, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refresh, setRefresh] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, refreshToken, id) => {
        setToken(jwtToken);
        setRefresh(refreshToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            refresh: refreshToken,
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.refresh, data.userId, data.username);
        }
        setReady(true);
    }, [login]);

    return { token, refresh, userId, login, logout, ready };
};