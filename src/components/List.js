import React from 'react'
import {default as api} from '../store/apiSlice';


function List() {
 
  const {data,isSuccess,isFetching,isError} = api.useGetLabelsQuery();

  const[deleteTransaction] = api.useDeleteTransactionMutation()
  

  let Transactions;

  const handlerClick = (e)=>{
    console.log(e.target.dataset.id)
    if(!e.target.dataset.id) return 0;
    deleteTransaction({_id:e.target.dataset.id})
    }


   if(isFetching){
    Transactions = <div> Fetching </div>
   }else  if(isSuccess){
    
    Transactions = data?.data?.map((v,i)=> <Transaction key={i} category={v} handler={handlerClick}/>)
  }
   else if(isError){
     Transactions = <div>Error</div>
   }

   

  return (
    <div className='flex flex-col py-6 gap-3'>
        <h1 className='py-4 font-bold text-xl'>History</h1>
        {Transactions}
        
    </div>
  )
}

function Transaction({category,handler}){
  
   if(!category) return null;
   return (
    <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{borderRight:`8px solid ${category.color??"#e5e5e5"}`}}>
  <button className='px-3' onClick={handler}>
    <i className='bx bx-trash' data-id={category._id??"0"} style={{color:`${category.color??"#e5e5e5"}`}} ></i> 
   </button>
        <span className='block w-full'> {category.name??""}</span>
    </div>
   )
}

export default List;