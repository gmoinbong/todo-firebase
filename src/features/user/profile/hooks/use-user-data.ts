import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { User } from '@/entity/user/model/user'
import { auth, db } from '@/shared/config/firebase';
import { userSchema } from '@/entity/user/lib';

export const useUserData = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));

                    if (userDoc.exists()) {
                        const parsedData = userSchema.parse({
                            ...userDoc.data(),
                            id: userDoc.id
                        });
                        setUserData(parsedData);
                    } else {
                        setError('User document not found');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Failed to load user data');
                } finally {
                    setLoading(false);
                }
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return { userData, loading, error };
};