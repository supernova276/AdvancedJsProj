let createElement=(element)=>document.createElement(element)
export const getCuisineCard=(arrOfCuisines,parentElement)=>{

    for(let cuisine of arrOfCuisines){
    
        const cuisineContainer=createElement("div")
        cuisineContainer.classList.add("filter")
        cuisineContainer.setAttribute("data-id",cuisine.ID)
        parentElement.appendChild(cuisineContainer) 

        const checkBox=createElement("input")
        checkBox.setAttribute("type","checkbox")
        checkBox.classList.add("checkbox")
        checkBox.setAttribute("data-id",cuisine.ID)
        // cuisineContainer.appendChild(checkBox)

        //creating label
        const label=createElement("label")
        label.classList.add("cusine-label","d-flex","align-center","gap")   
        label.appendChild(checkBox);
        // label.innerText=cuisine.Cuisine;         ////the innertext overrides the checkbox so we create a span for the inertext
        let labelText=createElement("span");
        labelText.innerText=cuisine.Cuisine;
        labelText.setAttribute("data-id",cuisine.ID)
        label.appendChild(labelText)

        label.setAttribute("data-id",cuisine.ID);
        cuisineContainer.appendChild(label)

    }
}