const cardId=localStorage.getItem("id")
console.log(cardId)
const URL=`https://recipeapi.prakashsakari.repl.co/api/recipes/${cardId}`

const getData= async (url)=>{
    try{
           const {data}=await axios.get(url)
           return data
    }
    catch(err){
          console.log(err)
    }
}
 
const singleRecipe= await getData(URL);
console.log(singleRecipe)