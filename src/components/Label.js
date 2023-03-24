import React from 'react';
import {default as api} from '../store/apiSlice'
import {getLabels} from '../helper/helpers'

// const obj=[
//      {   
//         type:"Savings",
//         color:'rgb(255, 99, 132)',
//         percent:10
//      },
//      {   
//         type:"Investment",
//         color:'rgb(54, 162, 235)',
//         percent:30
//      },
//      {   
//         type:"Expense",
//         color:'rgb(255, 205, 86)',
//         percent:20
//      }
//   ]

function Label() {

  const {data,isSuccess,isFetching,isError} = api.useGetLabelsQuery()
 // const data1 =api.useGetLabelsQuery();
   //console.log(data1)

   
 
  let Transactions;

  if(isFetching){
     Transactions = <div> Fetching </div>
  }else if(isSuccess && data.data !== undefined){
    
   // console.log(getLabels(data.data,'type'))
    Transactions = getLabels(data.data,'type')?.map((v,i)=> <LabelComponent key={i} data={v}/>)
  }
   else if(isError){
    Transactions = <div>Error</div>
   }
 //console.log(Transactions)
  return (
    <>
      {Transactions} 
    </>
  )
}

function LabelComponent({data}){
    return (
        <div className='lables flex justify-between'>
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3' style={{background:data.color??'#f9c74f'}}></div>
                <h3 className='text-md'>{data.type??""}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent)?? 0}%</h3>
        </div>
    )
}

export default Label;