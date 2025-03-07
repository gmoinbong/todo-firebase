import { FirebaseError } from "firebase/app";

export const errorMessageByCode = (error: FirebaseError) => {
    const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Email already in use',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password should be at least 6 characters',
    };
    
    return errorMessages[error.name]
};
