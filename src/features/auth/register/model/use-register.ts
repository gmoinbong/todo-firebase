import { User } from "@/entity/user/model/user";
import { auth, db } from "@/shared/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export enum RegisterType {
    EMAIL = 'email'
}

export const emailRegister = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userDoc = doc(db, 'users', user.uid);

    const userData: User = {
        name: name,
        email: email,
        createdAt: serverTimestamp(),
        uid: user.uid,

    }

    await setDoc(userDoc, userData);

}


export const useRegister = (type: RegisterType) => {
    if (type === RegisterType.EMAIL) {
        return emailRegister
    }

    return null;
}   