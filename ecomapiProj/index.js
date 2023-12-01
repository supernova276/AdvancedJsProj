const URL="https://fakestoreapi.com/products?limit=20";

let Productdata=[]
let filteredData=[]
let filter=false;
 async function getApi(url){

   let data= await fetch(url).then(res=>res.json());
   return data
}   
Productdata= await getApi(URL);
console.log(Productdata)


let productContainer=document.getElementById("product")
let searchContainer=document.getElementById("input")
let searchValue="";

let createElement=(element)=>document.createElement(element)

function renderProductData(Productdata){


    Productdata.forEach(product => {
    

    let productCont=createElement("div")
    productContainer.appendChild(productCont);
    productCont.classList.add("product-container")

    let prodImage=createElement('div')
    prodImage.classList.add("image-container")
    productCont.appendChild(prodImage)

    let image=createElement("img")
    image.setAttribute("src",product.image)
    prodImage.appendChild(image)

    let prodTitle=createElement("div");
    prodTitle.innerHTML=`${product.title}`
    prodTitle.classList.add("product-title")
    productCont.appendChild(prodTitle)

    let productDes=createElement("div")
    productDes.classList.add("product-des")
    // productDes.innerHTML=`${product.description}`
    productCont.appendChild(productDes)

    let DesSpan=createElement("div")
    DesSpan.classList.add("des-span")
    productCont.appendChild(DesSpan)

    let priceSpan=createElement("span")
    priceSpan.classList.add("product-price")
    priceSpan.innerHTML=`Price:${product.price}`
    DesSpan.appendChild(priceSpan)

    let ratingSpan=createElement("span")
    ratingSpan.classList.add("product-rating");
    ratingSpan.innerHTML=`rating:${product.rating.rate}`;
    DesSpan.appendChild(ratingSpan)        
    });

}


renderProductData(Productdata)


//debounce

function filterData(e){
    searchValue=e.target.value.toLowerCase();
    console.log(searchValue)

   filteredData=  Productdata.filter(({title})=>title.toLowerCase().includes(searchValue))

   if(!filteredData.length)
   filteredData= Productdata.filter(({category})=>category.toLowerCase().includes(searchValue))
   

    console.log(filteredData)
    productContainer.innerHTML="";
    renderProductData(filteredData)
}

function debounce(callback,delay){

    let timerId;

    return function(...args){
        clearTimeout(timerId);
 timerId=setTimeout(() => {
    callback(...args);

 },delay);

    }

}

let debouncedFunction=debounce(filterData,2000)

searchContainer.addEventListener('keyup', debouncedFunction)
