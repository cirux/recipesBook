import firebase from 'firebase';

/**
 * Service listed in app.module.ts (providers)
 */
export class AuthService{

    /**
     * Create a new user.
     * Returns an error if the email is invalid or already used
     */
    signup(email: string, password: string){
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}