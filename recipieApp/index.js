import { getRecipeCard } from "./recipeCard.js";
import { getCuisineCard } from "./getCuisine.js";
let cardElement=document.querySelector(".main")
let cuisineElement=document.querySelector(".cusine-filter")
let searchContainer=document.querySelector(".input")
let searchValue="";
let filterdRecipes=[];
let selecteCuisines=[];

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
 
const getfilteredData= ()=>{

    //filtration basedo n search value
    filterdRecipes=searchValue?. length>0? recipes.filter((recipe)=>recipe.TranslatedRecipeName.toLowerCase()
    .includes(searchValue)):recipes;

    //filteration based on applied filters
if(selecteCuisines?. length>0){
    console.log("search value filteredrecipe",filterdRecipes)
    console.log("selected cuisine",selecteCuisines)
    filterdRecipes=filterdRecipes.filter((recipe)=>selecteCuisines.includes(recipe.Cuisine))
}
    return filterdRecipes

}

function searchData(e){
     
    searchValue=e.target.value.toLowerCase();
    filterdRecipes=getfilteredData();
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

function handleCuisineclick(e){
     
    const id=e.target.dataset.id;
    const isSelected=e.target.checked;  //use to check if the current checkbox is selected or not returens boolean
    console.log(isSelected)

    // const selectedCuisine=cuisines.filter((cuisine)=>cuisine.ID===id)[0]
    const selectedCuisine=cuisines.reduce((acc,curr)=> curr.ID===acc?curr.Cuisine:acc,id)
    console.log(selectedCuisine)

    selecteCuisines= isSelected?[...selecteCuisines,selectedCuisine]:
    selecteCuisines.filter((cuisine)=>cuisine!==selectedCuisine)

    const filteredCuisine=getfilteredData();
    console.log(filteredCuisine)
    cardElement.innerHTML="";
    getRecipeCard(filteredCuisine,cardElement)
}
cuisineElement.addEventListener("click",handleCuisineclick)

cardElement.addEventListener("click",(e)=>{
    let id=e.target.dataset.id;
      console.log(id)
    if(id){
        localStorage.clear("id") //local storage is used to link this item to the differnt page
        localStorage.setItem("id",id);
        location.href="./singleRecipe.html "
    }
})