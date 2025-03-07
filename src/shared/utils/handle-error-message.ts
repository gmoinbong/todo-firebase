import { FirebaseError } from "firebase/app";

export const handleErrorMessage = (error: unknown) => {
    if(error instanceof FirebaseError) {
        //
    }

    if(error instanceof Error) {
        //
    }

    return 'Unkown error'
}