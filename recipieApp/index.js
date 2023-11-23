import { getRecipeCard } from "./recipeCard.js";
import { getCuisineCard } from "./getCuisine.js";
let cardElement=document.querySelector(".main")
let cuisineElement=document.querySelector(".cusine-filter")
let searchContainer=document.querySelector(".input")
let searchValue="";
let filterdRecipes=[];

const RECIPEURL= "https://recipeapi.prakashsakari.repl.co/api/recipes";
const CUSINEURL="https://recipeapi.prakashsakari.repl.co/api/recipes/cuisines"

const getData= async (url)=>{
    try{
           const {data}=await axios.get(url)
           return data
    }
    catch(err){
          console.log(err)
    }
}
 
const recipes= await getData(RECIPEURL);
const cuisines=await getData(CUSINEURL)
console.log(cuisines)

getRecipeCard(recipes,cardElement)
getCuisineCard(cuisines,cuisineElement)
 
const getFiltedData= ()=>{

   return filterdRecipes=searchValue?. length>0? recipes.filter((recipe)=>recipe.TranslatedRecipeName.toLowerCase()
    .includes(searchValue)):recipes;

}

function searchData(e){
     
    searchValue=e.target.value.toLowerCase();
    filterdRecipes=getFiltedData();
    console.log(filterdRecipes)
    cardElement.innerHTML="";
    getRecipeCard(filterdRecipes,cardElement)
}

function debounce(callback,delay){
    let timerId;
    return function (...args){
        clearTimeout(timerId)

       timerId=setTimeout(()=>{
           callback(...args);
       },delay)
    }
}
let debouncedfunction=debounce(searchData,500);
searchContainer.addEventListener("keyup",debouncedfunction)