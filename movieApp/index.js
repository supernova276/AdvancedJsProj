const URL="https://movies-app.prakashsakari.repl.co/api/movies";
const searchInput=document.querySelector('.search-container')
const movieRatings=document.querySelector('#rating-select')
const movieGenres=document.querySelector('#genre-select')
let rating=0;
let genre=""
let searchValue=""


const getMovies= async (url)=>{

 //with async await we use try catch block
 try{
 const {data}= await axios.get(url) //here we have destructured teh obje returned as a response and we are displaying
 //only the data key so we get only the data
//  console.log(data)
return data //this will return a promise
 }catch(err){
//  console.log(err)
 }
}
// getMovies(URL);


///////////////////////////////if we return the data from the axios
//statemen-1
let movies = await getMovies(URL)
console.log(movies)

//statement-2
// movies.then(resp=>console.log(resp))

//statement 1 and 2 do the same thing

/////////////////////////////////////////////////////////using fetch instead of axios
// fetch(URL)
// .then((response)=>response.json())
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err))

//////////////////////////////////////////////////////////prefering axois over fetch
//axios is more redable
//with axios we do not need to convert the response into json
let mainElement=document.querySelector("main")

const createElement=(element)=>document.createElement(element)

const createMovieCard=(movies)=>{

for(let movie of movies){

    //cardcontainer
let card=createElement("div");
mainElement.appendChild(card)
card.classList.add("card","shadow")

//imgcontainer
let imgContainer=createElement("div")
card.appendChild(imgContainer)
imgContainer.classList.add("card-image-container")
let img=createElement("img");
img.classList.add("card-image-container")
img.setAttribute("src",movie.img_link)
img.setAttribute("alt",movie.name)
imgContainer.appendChild(img)

//detailcontainer

let detailContainer=createElement("div")
card.appendChild(detailContainer)
detailContainer.classList.add("movie-details")
let titleContainer=createElement("p");
detailContainer.appendChild(titleContainer)
//titlecontainer
titleContainer.classList.add("title")
titleContainer.innerText=`${movie.name}`;
//genrecontainer
let genreContainer=createElement("p");
detailContainer.appendChild(genreContainer)
genreContainer.classList.add("genre")
genreContainer.innerText=`Genre: ${movie.genre}`
//ratingcontainer
let ratingsContainer=createElement("div")
detailContainer.appendChild(ratingsContainer)
ratingsContainer.classList.add("ratings")
//starrating
let starRating=createElement("div");
ratingsContainer.appendChild(starRating)
starRating.classList.add("star-rating")
//star symbol
let symbol=createElement("span");
starRating.appendChild(symbol)
symbol.classList.add("material-symbols-outlined")
symbol.innerText="star";
let ratingCount=createElement("span");
starRating.appendChild(ratingCount)
ratingCount.innerText=`${movie.imdb_rating}`;
let duration=createElement("p")
ratingsContainer.appendChild(duration)
duration.innerText=`${movie.duration}mins`

    }

}

function getfilteredData(){
    let filteredMovies=searchValue ?.length>0 ? movies.filter((movie)=>searchValue===movie.name.toLowerCase()
   ||searchValue===movie.director_name.toLowerCase() || 
   movie.cast_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    movie.writter_name.toLowerCase().includes(searchValue.toLowerCase())):movies

    if(rating>0){
        //a element is being searched and the rating is also greater than zero
        //this means that we should now search for the particular rating on the filtered array

        filteredMovies=searchValue ?. length>0? filteredMovies:movies
        filteredMovies=filteredMovies.filter((movie)=>movie.imdb_rating>=rating)
    }

    if(genre ?. length>0 ){
        filteredMovies=searchValue?. length>0 || rating>7? filteredMovies: movies
        filteredMovies=filteredMovies.filter((movie)=>movie.genre.includes(genre))
    }
    return filteredMovies;
}

 function handleInput(e){
    searchValue=e.target.value.toLowerCase();
    console.log(e.target.value)
   let filteredMovies=getfilteredData()
   //creating filters->filter for name
   mainElement.innerHTML="";
   createMovieCard(filteredMovies)
 }

 function delayHandleInput(handleInput,delay){

    let timerId;
       return function(...args) {
    
        clearTimeout(timerId)
       timerId= setTimeout(()=>{
                 handleInput(...args);          //these args refer to the event/e inside the apicall since we dont 
                       //know the exact event inside this functin so we use the args paramenter
        },delay)
    }

 }

let delayedHandleInput=delayHandleInput(handleInput,500)
searchInput.addEventListener('keyup',delayedHandleInput)//------------>the api being called after every 500sec


function handleRatingSelector(e){
    rating=e.target.value;
   let filterbyRating=getfilteredData()
    mainElement.innerHTML="";
    createMovieCard(rating ? filterbyRating:movies )
}

movieRatings.addEventListener('change', handleRatingSelector)
//filtering genres

const genres=movies.reduce((acc,curr)=>{

    let genreArr=[]
    let tempGenreArr=curr.genre.split(",")
    acc=[...acc,...tempGenreArr]

    for(let genre of acc){ //the acc will only have one array at a time, it wont have multiple arrays
         
        if(!genreArr.includes(genre)){
            genreArr=[...genreArr,genre]
        }
    }
    return genreArr
},[])

for(let genre of genres){
    const option=createElement("option")
    option.setAttribute("value",genre)
    option.innerText= genre;
    movieGenres.appendChild(option) 
}

movieGenres.addEventListener('click',(e)=>{
       genre=e.target.value;
      const filterbyGenre=getfilteredData();
      mainElement.innerHTML="";
    createMovieCard(genre ? filterbyGenre :movies )
})
createMovieCard(movies)