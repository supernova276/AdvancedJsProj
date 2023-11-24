const createElement=(element)=>document.createElement(element)
export  const getRecipeCard=( recipes,parentElement)=>{

for(let recipe of recipes){
let card=createElement("div")
parentElement.appendChild(card);
card.classList.add("card", "d-flex" ,"shadow")
let imageContainer=createElement("div");
card.appendChild(imageContainer)
imageContainer.classList.add("card-image")
let img=createElement("img");
imageContainer.appendChild(img);
img.setAttribute("src", recipe["image-url"])
img.setAttribute("data-id",recipe.ID)
//description conatiner
let desContainer=createElement("div")
card.appendChild(desContainer)
desContainer.classList.add("description")
//title
let title=createElement("p")
desContainer.appendChild(title)
title.classList.add("heading-3","d-flex","wrap-items","cuisine-title")
title.innerText=`${recipe.TranslatedRecipeName}`

//details
let details=createElement("div");
desContainer.appendChild(details);
details.classList.add("details", "d-flex")
//cusine
let cusine=createElement("p")
details.appendChild(cusine)
cusine.classList.add("cusine","d-flex","wrap-items")
cusine.innerText=`Cusine:${recipe.Cuisine}`;
//display-time
let displayTime=createElement("div")
desContainer.appendChild(details)
displayTime.classList.add("display-time" ,"d-flex")
//icon
let cardIcon=createElement("span");
displayTime.appendChild(cardIcon)
cardIcon.classList.add("material-icons-outlined" ,"card-icon")
cardIcon.innerText="timer";
//time in mins
let time=createElement("span");
displayTime.appendChild(time);
time.classList.add("time");
time.innerText=`${recipe.TotalTimeInMins} mins`
details.appendChild(displayTime)
}
}