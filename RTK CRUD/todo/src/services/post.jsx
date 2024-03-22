import {createApi ,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi =createApi({
    reducerPath:'postApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://65f96638df1514524611825a.mockapi.io/'
    }),
    endpoints:(builder)=>({
        getAllPost:builder.query({
            query:()=>({
                url:'crud/',
                method:'GET'
            })
        }),
        insertData: builder.mutation({
            query: (data) => ({
                url: 'crud/',
                method: 'POST',
                body: data,
            }),
        }),
        updateData: builder.mutation({
            query: ({ id, ...data }) => ({
              url: `crud/${id}`,
              method: 'PUT',
              body: data,
            }),
          }),
          deleteData: builder.mutation({  
            query: (id) => ({
              url: `crud/${id}`,
              method: 'DELETE',
            }),
          }),
    }),
})

export const {useGetAllPostQuery,useInsertDataMutation,useUpdateDataMutation,useDeleteDataMutation} = postApi