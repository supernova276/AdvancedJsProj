 const URL="https://opentdb.com/api.php?amount=10&category=27&type=multiple"
 let quizzes=[];
 let currQuesIndex=0;
 const quesContainer=document.querySelector(".question-container")
 const OptionConatiner=document.querySelector(".option-container")
 const nextButton=document.querySelector(".next")
 const quizContainer=document.querySelector(".quiz")
 const quitContainer=document.querySelector(".quit")
 const scoreContainer=document.querySelector(".quiz-box")
 const buttonContainer=document.querySelector(".cta-button")
 let quizBox;

 let score=0;
 
 const getData= async (url)=>{

try{
const {data : {results}}= await axios.get(url);
    return results;
}
catch(err){
    console.log(err);
}
 }

let  getQuizzes=async ()=> {

quizzes= await getData(URL)
 
}

getQuizzes();

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function createQuesAndOptions(quizzes,currQuesIndex){
     
    console.log(quizzes)
     //create an obj with key quizzes(initially this is an array of objects)
    //the above statement will return  0 as the size of quizzes  array because quizzes stores a resoponse
    //which takes time and is an async operatoin but getquizzes func is a part of the gec so it continues to 
    //execute and returns 0 as the default value of quizzes so we use a set time out to execute getquizzes

     quizBox=document.createElement("div")
    quizBox.classList.add('quiz-box')
    quizContainer.appendChild(quizBox)

    const headingContainer=document.createElement('div')
    quizContainer.appendChild(headingContainer)
    headingContainer.classList.add("heading-cont")

    quizBox.appendChild(headingContainer)

    const title=document.createElement("p")
    title.innerText=`GeneralKnowledge`

    headingContainer.appendChild(title)
    const quesSpan=document.createElement("p")
    headingContainer.appendChild(quesSpan)
    quesSpan.classList.add("quesAlingment")

    const quesno=document.createElement('span')
    quesno.classList.add('quesNo')
    quesno.innerText=`ques ${currQuesIndex}`;

    quesSpan.appendChild(quesno)

    const scoreCont=document.createElement('span')
    scoreCont.classList.add('score')
    scoreCont.innerText=score;

    quesSpan.appendChild(scoreCont)

    // const quesElement=document.createElement("div");
    quesContainer.classList.add('question-container')
    quesContainer.innerText=` ${quizzes[currQuesIndex].question}`;
    quizBox.appendChild(quesContainer)

    ///options
   let options=[quizzes[currQuesIndex].correct_answer,...quizzes[currQuesIndex].incorrect_answers.
   sort(()=>Math.random()-0.5) ]

    for(let option of options){
    let id= uid()
     OptionConatiner.classList.add("options-container","d-flex","direction-column","gap")
     const labelElement=document.createElement("label")
     OptionConatiner.appendChild(labelElement)
     let radioButton=document.createElement("input")
     radioButton.setAttribute("type","radio")
    //  radioButton.setAttribute("name",currQuesIndex)
     labelElement.appendChild(radioButton)
     let OptionName=document.createElement("span")
     OptionName.classList.add("option-space")
     OptionName.setAttribute("data-type",option)
     OptionName.innerText=option
     radioButton.setAttribute("data-type",option)
     labelElement.appendChild(OptionName)
     quizBox.appendChild(OptionConatiner)
     //input and label i have to create if input is inside label it means it is for that label
    }

    // let buttonContainer=document.createElement("div");
    // quizBox.appendChild(buttonContainer)
    // buttonContainer.classList.add('cta-button')

    // let quitButton=document.createElement("button");
    // quitButton.classList.add('quit')
    // buttonContainer.appendChild(quitButton)
    // quitButton.innerHTML="quit"

    // let nextButton=document.createElement("button");
    // nextButton.classList.add('next')
    // buttonContainer.appendChild(nextButton)
    // nextButton.innerHTML="next"
    quizBox.appendChild(buttonContainer)

    //wether the option is correct or not should be checked after clicking on the submit button
    OptionConatiner.addEventListener('click',(e)=>{
        let isSelected=e.target.checked;
        let value=e.target.dataset.type;
        if(isSelected){
        score= value===quizzes[currQuesIndex].correct_answer?score+1:score
        }
     console.log(score)
})
 }


 setTimeout(()=>createQuesAndOptions(quizzes,currQuesIndex),2000)

 function debounce(callback,delay){

    let timerId;

    return function (...args){

        clearTimeout(timerId);

     timerId=   setTimeout(() => {
        callback(...args);
    }, delay);
}
 }
 function handleQuit(){
    quizBox.innerHTML=`your score is ${score}`;
 }

 function handleNext(e){
    //  console.log(e.target)
    currQuesIndex++;
    quizContainer.innerHTML="";
    OptionConatiner.innerHTML="";

    if(currQuesIndex===10){
        console.log("kya hogya ab")
        console.log(quizBox)
       quizContainer.innerHTML=`your score is ${score}`  
    }
    else
    createQuesAndOptions(quizzes,currQuesIndex)
 }

 let debouncedQuit=debounce(handleQuit,500)
 quitContainer.addEventListener('click',debouncedQuit)


 let debouncedNext=debounce(handleNext,500)
 nextButton.addEventListener("click",debouncedNext)