import { collection, doc, setDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalslice"

//Asincronas
export const startNewNote = ()=>{
    console.log('Start new note')
    return async(dispatch, getState)=>{
        dispatch(savingNewNote())
        const {uid} = getState().auth
        //uid
        const newNote = {
            title:'',
            body:'',
            date:new Date().getTime()
        }
        const newDoc = doc(collection(firebaseDB,`${uid}/journal/notes`))
        await setDoc(newDoc,newNote)
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))

        newNote.id = newDoc.id;

    }
}
export const startLoadingNotes = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth;
        
    }
}