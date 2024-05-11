import {createSlice} from '@reduxjs/toolkit'
import { VscLaw } from 'react-icons/vsc';

const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    searchQuery:"",
    loading:null,
}

export const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser:(state,value)=>{
            state.user=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSearchQuery(state,value){
            console.log("muje hi bula lia ",value.payload);
            state.searchQuery=value.payload

        }
    }
})

export const {setUser,setLoading,setSearchQuery}=profileSlice.actions;
export default profileSlice.reducer;