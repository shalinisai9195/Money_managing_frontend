import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart,ArcElement} from 'chart.js';
import Label from './Label';
import {chart_Data,getTotal} from '../helper/helpers';
import {default as api} from '../store/apiSlice'

Chart.register(ArcElement);

  // const config ={
  //    data :{
  //       datasets: [{
  //           label: 'My First Dataset',
  //           data: [300, 50, 100],
  //           backgroundColor: [
  //             'rgb(255, 99, 132)',
  //             'rgb(54, 162, 235)',
  //             'rgb(255, 205, 86)'
  //           ],
  //           hoverOffset: 4,
  //           borderRadius:20,
  //           spacing:10
  //         }]
  //       },
  //       options:{
  //          cutout:115
  //       }

  // }

function Graph() {

  const {data,isSuccess,isFetching,isError} = api.useGetLabelsQuery()

  let graphData;

   getTotal(data);

  if(isFetching){
    graphData = <div> Fetching </div>
 }else if(isSuccess && data.data !== undefined){
 
   //console.log( final)
 
   graphData = <Doughnut {...chart_Data(data.data)}/>
 }
  else if(isError){
    graphData = <div>Error</div>
  }
 
  return <>
     <div className='flex justify-content max-w-xs mx-auto'>
       <div className='item'>
         <div className='chart relative'>
              {graphData}
            <h3 className='mb-4 font-bold title'> Total 
              <span className='block text-3xl text-emerald-400'>${getTotal(data)??0}</span>
            </h3>
            
         </div>
   
         <div className='flex flex-col py-10 gap-4'>

         <Label/>
         
         </div>
       
       </div>
    </div>
   
  </>
    
  
}

export default Graph