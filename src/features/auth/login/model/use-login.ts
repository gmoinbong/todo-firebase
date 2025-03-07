import { User } from "@/entity/user/model/user";
import { auth, db } from "@/shared/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export enum LoginType {
    EMAIL = 'email'
}

interface LoginResponse {
    user: User;
    token: string;
}

export const emailLogin = async (email: string, password: string): Promise<LoginResponse> => {
    const { user: authUser } = await signInWithEmailAndPassword(auth, email, password);

    const userDoc = await getDoc(doc(db, 'users', authUser.uid));

    if (!userDoc.exists()) {
        throw new Error('User data not found');
    }

    const userData = userDoc.data() as User;

    const token = await authUser.getIdToken();

    return {
        user: {
            ...userData,
            uid: authUser.uid,
            email: authUser.email || email
        },
        token
    };
};

export const useLogin = (type: LoginType) => {
    const loginMethods = {
        [LoginType.EMAIL]: emailLogin
    };

    return loginMethods[type] || null;
};