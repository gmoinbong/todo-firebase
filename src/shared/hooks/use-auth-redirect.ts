import { useEffect } from 'react';
import { auth } from '@/shared/config/firebase';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                navigate('/');

            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, []);
};