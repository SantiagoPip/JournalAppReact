import { createSlice } from "@reduxjs/toolkit";
export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving:false,
    messageSaved:'',
    notes:[],
    active:null
    // active:{
    //     id:'ABC123',
    //     title:'',
    //     body:'',
    //     date:123456,
    //     imageUrls:[],//https://foto1.jp, ...
    // }
  },
  reducers: {//Tiene que ser trabajo sincrono
    savingNewNote:(state)=>{
      state.isSaving = true;
    },
   addNewEmptyNote:(state,action)=>{
      state.notes.push(action.payload)
      state.isSaving = false
   },
    setActiveNote:(state,action)=>{
      state.active = action.payload
    },
    setNotes:(state,action)=>{

    },
    setSaving:(state)=>{

    },
    updateNote:(state,action)=>{

    },
    deleteNoteById:(state,action)=>{

    }

  },
});
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote
 } = journalSlice.actions;
