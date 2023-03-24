import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURl = 'http://localhost:7070';

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURl}),
    endpoints: builder =>({
        //get categories http://localhost:7070/api/categories
        getCategories:builder.query({
            query:() => '/api/categories',
            providesTags:['categories']
        }),

        //get labels http://localhost:7070/api/labels
        getLabels:builder.query({
            query:() => '/api/labels',
            providesTags:['transactions']
        }),

        // add new Transaction POST: http://localhost:7070/api/transaction
        addTransaction:builder.mutation({
            query:(initialTrans)=>({
                url:'/api/transaction',
                method:"POST",
                body:initialTrans
            }),
            invalidatesTags:['transactions']
        }),

        //delete Trans Delete : http://localhost:7070/api/transaction
        deleteTransaction:builder.mutation({
            query: recordid => ({
                url:'api/transaction',
                method:"DELETE",
                body:recordid
            }),
            invalidatesTags:['transactions']
        })
    })
})

export default apiSlice;