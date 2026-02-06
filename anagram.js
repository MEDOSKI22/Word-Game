let score = 0;
let wordsCount = 0;
let userUsedWords = [];

let tiles= document.querySelectorAll(".tile");
let selectedLetter = "";
let maxLetters=7;
const selected = document.querySelector(".selected");
let usedIndex = [];
let letterUsed = false;   
      

startGame();

//Function to fetch the word
async function fetchWord(){
    try {
                  const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
                  const data = await response.json();
                  let word = data[0];
                  console.log("Fetched word:", word);
                  return word;
    } catch (error) {
                  console.error("Error fetching word", error);
                  return null;
    } 
};

//Function to start game
async function startGame() {
    let loadingScreen  = document.querySelector(".loadingScreen");
    loadingScreen.style.display = 'block';
    fetchWord();
    let word = await fetchWord();

    if (!word) {
        console.error("No word fetched, game cannot start.");
        loadingScreen.textContent = "NO INTERNET CONNECTION";
        return 1; // Exit if no word is fetched
    }
    
    // code for program shouldn't start still name is inputed

    // If(){

    // }

    loadingScreen.style.display = 'none';
    console.log(word);
    word = word.toUpperCase();
    let output = word.split('');
    maxLetters = output.length;
    if(maxLetters > 7){
        for(let i=maxLetters; i>7; i--){
            output.pop();
            maxLetters--;
        };
     }else if(maxLetters < 7){
        let length = 7 - maxLetters;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i = 0; i < length; i++){
            let randomInd = Math.floor(Math.random() * characters.length);
            output.push(characters.charAt(randomInd));
            maxLetters++
        };

     };
        shuffleWord(output, maxLetters);
        startTimer();
        allEvents();
        console.log(output); 
  }
        




function shuffleWord(array, arrayLen){
    console.log(arrayLen)
    for(let i = arrayLen - 1; i>0; i--){
               let j = Math.floor(Math.random()* i+1);
               [array[i], array[j]] = [array[j], array[i]]; 
    };
    for(let i = 0; i < arrayLen; i++){
                document.getElementsByClassName("tile")[i].innerHTML = array[i];
    };
}

function allEvents(){ 
    clickEvents();
    keyPressedEvents();

    async function submitGuess() {
        if(selectedLetter.length <= 2 || userUsedWords.includes(selectedLetter)){
            console.error("Unsupported Word length");
            let popIndex = selectedLetter.length;
            selectedLetter = "";
            selected.textContent = selectedLetter;
            for(let i = 0; i < popIndex; i++){
                tiles[usedIndex.pop()].style.visibility = "visible";
                letterUsed = false;
            }
            return 11; //return with unsupported word length
        }

        try{
            let meaningTab = document.querySelector(".meaning");
            selectedLetter = selectedLetter.toLowerCase();
            let enteredWord = await fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedLetter}`);
            let defFile = await enteredWord.json();
            let definition = defFile[0].meanings[0].definitions[0].definition;
            userStatUpdate(selectedLetter);
            selectedLetter = selectedLetter.charAt(0).toUpperCase() + selectedLetter.slice(1).toLowerCase();
            meaningTab.textContent = selectedLetter + ": " + definition;
            selectedLetter = "";
            selected.textContent = selectedLetter;
            for(let i = 0; i < maxLetters; i++){
                tiles[usedIndex.pop()].style.visibility = "visible";
                letterUsed = false;
            }
            return definition;
        }catch(error){
            console.error("you just arrived at: ", error);
            let popIndex = selectedLetter.length; 
            selectedLetter = "";
            selected.textContent = selectedLetter;
            for(let i = 0; i < popIndex; i++){
                tiles[usedIndex.pop()].style.visibility = "visible";
                letterUsed = false;
            }
            return 111;
        }
    }

    function clearSelectedArea(selectedLetter){
        let popIndex = selectedLetter.length;
        selectedLetter = "";
        selected.textContent = selectedLetter;
        for(let i = 0; i < popIndex; i++){
                    tiles[usedIndex.pop()].style.visibility = "visible";
                    letterUsed = false;
                }
    }
            
        

    
 function clickEvents(){
       
    for( let i = 0; i < maxLetters; i++){
              tiles[i].addEventListener("click", ()=>{
                            let data = tiles[i].textContent;
                            selectedLetter += data
                            selected.textContent = selectedLetter;
                            tiles[i].style.visibility = "hidden";
                            usedIndex.push(i);
                            letterUsed = true;
              });
    };

    const clearLetters = document.querySelector(".clear");
    clearLetters.addEventListener("click",()=>{
                  selectedLetter = "";
                  selected.textContent = selectedLetter;
                  tiles.forEach(tile =>{
                                tile.style.visibility = "visible";
                  });
                  
    });

    const enterButton = document.querySelector(".enter");
    enterButton.addEventListener("click", ()=>{
        submitGuess();
    })
    }


 function keyPressedEvents(){
    
        document.addEventListener("keydown", (event)=>{
                       let keyPressed = event.key.toLowerCase();          
                        for(let i=0; i < maxLetters; i++){
                         let data = tiles[i].textContent;
                          if( keyPressed === data.toLowerCase() && tiles[i].style.display !== "none" && !usedIndex.includes(i)){
                                    selectedLetter += data;
                                    selected.textContent = selectedLetter;
                                    usedIndex.push(i);
                                    tiles[i].style.visibility = "hidden";
                                    letterUsed = true;
                                    break;
                                    }
                         }
                      if(!letterUsed){
                      console.log("it's been used");
                     }
        });
        document.addEventListener('keydown', (event) => {
            let keyPressed = event.key.toLowerCase();
        
            if (keyPressed === 'backspace') {
                removeLastLetter(); 
            } else if (keyPressed === 'enter') {
                submitGuess();
            } 
        
        
        
        function removeLastLetter() {
            if (selectedLetter.length > 0) {
                selectedLetter = selectedLetter.slice(0, -1); 
                selected.textContent = selectedLetter;
                tiles[usedIndex.pop()].style.visibility = "visible";
            }
        }
        
        
       
        });
    }

 function playSound(error) {
     //if(typeof error === )
        let audio = new Audio("sound/error.mp3");
        audio.play();
      }
      
}

function startTimer() {
    let timeLimit=60;
    let timeRemaining=timeLimit;
    let countdown;
    const timerElement = document.getElementById('timer');
    countdown = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerElement.textContent = `Time: ${timeRemaining}s`;
        } else {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

function endGame(){
    //come back to code here
    alert(`Time's up! Your final score is ${score} with ${wordsCount} words found.`);
    let stop = 1;
    return
    stop;
}
    
function userStatUpdate(word){
    let wordScore = word.length;
    if (wordScore == 3){
        score += 100;
        wordsCount ++;
    }else if (wordScore == 4){
        score += 400;
        wordsCount ++;
    }else if (wordScore == 5){
        score += 1200;
        wordsCount ++;
    }else if (wordScore == 6){
        score += 2000
        wordsCount ++;
    }else if (wordScore == 7){
        score += 3000;
        wordsCount ++;
    }
    document.querySelector("#score").textContent= `SCORE: ${score}`;
    document.querySelector("#words").textContent= `WORD: ${wordsCount}`;
    userUsedWords.push(word);

 }   

function clearSelectedArea(){
    selectedLetter = "";
    selected.textContent = selectedLetter;
    for(let i = 0; i < maxLetters; i++){
                tiles[usedIndex.pop()].style.visibility = "visible";
                letterUsed = false;
            }
}
        
