import { collection, doc, setDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { FirebaseError } from "firebase/app"
import { fileUpload } from "../../helpers"

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
        if(!uid) throw new Error('El UID del usuario no existe')
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
        

    }
}
export const startSaveNote = ()=>{
    return async(dispatch,getState)=>{
        dispatch(setSaving())
        const {uid} = getState().auth;
        const {active:note} = getState().journal
        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        console.log(note, 'note in thinkssssssssssssssssssssssssssssssssssssssssssssss')
        await setDoc(docRef,noteToFireStore,{merge:true})//Merge union si hay campos que no estaban pues se mantienen
        dispatch(updateNote(note))
    }
}
export const startUploadingFiles = (files=[])=>{
    return async(dispatch)=>{
        dispatch(setSaving())
        const fileUploadPromises = []
        for (const file of files){
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrl = await Promise.all(fileUploadPromises)
        console.log(photosUrl)
        dispatch(setPhotosToActiveNote(photosUrl))
        


    }
}