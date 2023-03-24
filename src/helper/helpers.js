import _ from 'lodash';

export function getSum(transactions,type){
    let sum = _(transactions)
             .groupBy("type")
             .map((objs,key)=>{
                if(!type) return _.sumBy(objs,'amount');
                return {
                    'type':key,
                    'color':objs[0].color,
                    'total':_.sumBy(objs,'amount')
                }
            })
            .value()
          // console.log(sum)
    return sum;
   
}



export function getLabels(transactions){

    let amountSum = getSum(transactions,'type');
    
    let Total = _.sum(getSum(transactions))

    let percent = _(amountSum)
                  .map(objs => _.assign(objs,{percent:(100 * objs.total)/Total}))
                  .value()
    // console.log(amountSum)
   return percent;
   
}

export function chart_Data(transactions,custom){
 
    let bg = _.map(transactions,a => a.color);
    bg = _.uniq(bg)
    //console.log(bg);

    let dataValue = getSum(transactions)

    const config ={
        data :{
           datasets: [{
               label: 'My First Dataset',
               data: dataValue,
               backgroundColor: bg,
               hoverOffset: 4,
               borderRadius:20,
               spacing:10
             }]
           },
           options:{
              cutout:115
           }
   
     }
     return custom??config;
}

export function getTotal(transactions){
    if(transactions){
        return _.sum(getSum(transactions.data));
    }
 
 //console.log(transactions)
 //console.log(_.sum(getSum(transactions.data)))
}