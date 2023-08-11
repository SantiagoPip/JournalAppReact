import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseApp, firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoole = async()=>{
    try{
        const result = await signInWithPopup(firebaseAuth,googleProvider)
        const credentials = GoogleAuthProvider.credentialFromResult(result)
        const {displayName,email,photoURL,uid} = result.user;
        return{
            ok:true,
            displayName,email,photoURL,uid
        }
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
     
        return {
            ok:false,
            errorMessage,
            errorCoden
        }
    }

}
export const registerUserWithEmailAndPassword= async({email,password,displayName})=>{
    try{
         const resp = await createUserWithEmailAndPassword(firebaseAuth,email,password)
         const {uid,photoURL} = resp.user;
         await updateProfile(firebaseAuth.currentUser,{
            displayName
         })
         //TODO: Actualizar el usuario display name 
         return {
            ok:true,
            uid,photoURL,email,displayName
         }
    }catch(error){
        return {ok:false,errorMessage:error.message}
    }

}
export const loginWithEmailAndPassword=async({email,password})=>{
    try{
        const resp = await signInWithEmailAndPassword(firebaseAuth,email,password)
        const {uid,photoURL,displayName} = resp.user
        return {
            ok:true,
            uid,photoURL,displayName
        }
    }catch(error){
        
        return {ok:false,errorMessage:error.message}
    }
}
export const logoutFirebase = async()=>{
    return await firebaseAuth.signOut()
}