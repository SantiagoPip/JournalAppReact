import { checkingCredentials,logout,login } from "./authSlice"
import {loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, singInWithGoole} from '../../firebase/providers'
export const checkingAuthentication = (email, password)=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
    }
}
export const startGoogleSignIn = ()=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
        const result = await singInWithGoole()
        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}
export const startCreatingWithEmailPassword = ({email,password,displayName})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
        const {ok,uid,photoURL,errorMessage} = await registerUserWithEmailAndPassword({email,password,displayName})
        console.log({ok})
        if(!ok){
            console.log('usuario creado')
            return dispatch(logout({errorMessage}))
        }
        dispatch(login({uid,displayName,email,photoURL}))

    }
}
export const startLoginWithEmailAndPassword = ({email,password})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
        const result = await loginWithEmailAndPassword({email,password});
        if(!result.ok){
            return dispatch(logout(result))
        }
        dispatch(login(result))
    }
}
export const startLogOut = ()=>{
    return async(dispatch)=>{
        await logoutFirebase();
        dispatch(logout())

    }
}