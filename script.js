inputOfPlayer1=document.getElementById("player1-input")
inputOfPlayer2=document.getElementById("player2-input")

historyPlayer1=document.getElementById("player1-history")
historyPlayer2=document.getElementById("player2-history")

scorePlayer1=parseInt(document.getElementById("player1-score").innerText)
scorePlayer2=parseInt(document.getElementById("player2-score").innerText)

instructionPlayer1=document.getElementById("player-1 instruction")
instructionPlayer2=document.getElementById("player-2 instruction")

wordcheckP1=[]
wordcheckP2=[]

iteration=1

LetterCheckP1=[]
firstLetterP1=''
lastLetterP1=''

LetterCheckP2=[]
firstLetterP2=''
lastLetterP2=''


let timer;          
let timeLeft = 20;   
const timerDisplay = document.getElementById("timer");

function startTimer() {
    clearInterval(timer);       
    timeLeft = 20;              
    timerDisplay.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
    }, 1000);
}

function openModal(playerNumber) {
    document.getElementById("myModal").classList.remove("hidden");
    document.getElementById("myModal").classList.add("flex");
    document.getElementById("player-no").innerText=playerNumber
    }
    function closeModal() {
    document.getElementById("myModal").classList.add("hidden");
    document.getElementById("myModal").classList.remove("flex");
    location.reload()
    }



inputOfPlayer1.addEventListener("keyup", async function(e){
    if(e.key === "Enter" && inputOfPlayer1.value !== ""){
        try{
            const word = inputOfPlayer1.value.trim().toUpperCase()
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) throw new Error("Word not found"); 

            LetterCheckP1=word.split()
            firstLetterP1=LetterCheckP1[0][0]
            lastLetterP1= LetterCheckP1[0][word.length-1]
            // letterToStartForOpponent(lastLetterP1,instructionPlayer2)
            instructionPlayer2.innerText=lastLetterP1


            if(wordcheckP1.includes(word)){
                alert("Already used this word")
                inputOfPlayer1.value =""
            }
            else if(word.length < 4){
                alert("Word must contain minimum 4 letters")
                inputOfPlayer1.value =""
            }
            else if(iteration>1 && firstLetterP1!==lastLetterP2){
                alert("You must start your word with the last letter of your opponent's word")
                inputOfPlayer1.value=""
            }
            else{
                wordcheckP1.push(word)
                const wordP1= document.createElement('p')
                wordP1.innerText= word
                wordP1.classList.add("word-card")
                historyPlayer1.appendChild(wordP1)

                if(iteration>1){
                    scorePlayer1 -=timeLeft
                    document.getElementById("player1-score").innerText= scorePlayer1
                    if(scorePlayer1 <= 0 ){
                       openModal("Player-1") 
                    }
                }
                
                inputOfPlayer1.value =""
                inputOfPlayer1.disabled = true
                inputOfPlayer2.disabled = false
                inputOfPlayer2.focus()
                iteration +=1

                startTimer(() => {});
            }
        }
        catch(err){
            alert("Not a valid English word!");
            inputOfPlayer1.value = ""; 
        } 
    }
})

inputOfPlayer2.addEventListener("keyup",async function(e){
    if(e.key === "Enter" && inputOfPlayer2.value !== ""){
        try{
            const word = inputOfPlayer2.value.trim().toUpperCase()
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) throw new Error("Word not found");

            LetterCheckP2=word.split()
            firstLetterP2=LetterCheckP2[0][0]
            lastLetterP2=LetterCheckP2[0][word.length-1]
            // letterToStartForOpponent(lastLetterP2,instructionPlayer1)
            instructionPlayer1.innerText=lastLetterP2


            if(wordcheckP2.includes(word)){
                alert("Already used this word")
                inputOfPlayer2.value =""
            }
            else if(firstLetterP2!==lastLetterP1){
                alert("You must start your word with the last letter of your opponent's word")
                inputOfPlayer2.value=""
            }
            else if(word.length < 4){
                alert("Word must contain minimum 4 letters")
                inputOfPlayer2.value =""
            }
            else{
                wordcheckP2.push(word)
                const wordP2= document.createElement('p')
                wordP2.innerText= word
                wordP2.classList.add("word-card")
                historyPlayer2.appendChild(wordP2)

                scorePlayer2 -=timeLeft
                document.getElementById("player2-score").innerText= scorePlayer2
                if(scorePlayer2 <= 0 ){
                       openModal("Player-2") 
                    }

                inputOfPlayer2.value =""
                inputOfPlayer2.disabled = true
                inputOfPlayer1.disabled = false
                inputOfPlayer1.focus()

                startTimer(() => {});
            }
        }
        catch(err){
            alert("Not a valid English word!");
            inputOfPlayer2.value = "";
        }
    }
})