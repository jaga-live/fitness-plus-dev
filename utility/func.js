const objectToArray = (data)=>{

var key = Object.keys(data)
var value = Object.values(data)

var temp = key.map((element,index)=>({
    name : element,
    count : value[index]
}))


return temp

}




const ArraytoObject = (data)=>{



    
return data
}


module.exports = {objectToArray, ArraytoObject}