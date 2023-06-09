import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    categories:[],
    transaction:[]
}

export const expenseSlice = createSlice({
   name:'expense',
   intialState,
   reducers:{
     getTransactions:(state)=>{
        // get transaction code
     }
   }
})

export const{getTransactions} = expenseSlice.actions;
export default expenseSlice.reducer;