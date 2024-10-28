const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];

playBtn.addEventListener("click",play);
guessBtn.addEventListener("click", makeGuess);

date.innerHTML = time();
function time() {
    let d = new Date();
    return d;
}
function play() {
    score = 0;
    for(let i = 0;i<levelArr.length;i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    playBtn.disabled = true;
    guess.disabled = false;
    guessBtn.disabled = false;

    answer = Math.floor(Math.random()*level)+1;
    makeGuess.innerHTML = "Guess a #1-" + level;
    guess.placeHolder = answer;
}
function makeGuess() {
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)||userGuess == ""){
        makeGuess.innerHTML = "Invalid. Guess a #1-"+level;
        return;
    }
    score++;
    if (userGuess<answer){
        msg.innerHTML = "too low, guess a #1-" + level;

    }else if(userGuess>answer){
        msg.innerHTML = "too high, guess a #1-" + level;
    }else{
        msg.innerHTML = "Correct! You win, it took " + score + " tries.";
        scoreArr.push(score);
        updateScore();
        reset();
    }
}
function updateScore (){
    wins.innerHTML = "Total wins: " + scoreArr.length;
    let lb = document.getElementsByName("leaderboard");
    scoreArr.sort((a,b)=>a-b);
    let sum = 0;
    for(let i = 0;i<scoreArr.length;i++){
        if(i<lb.length){
            lb[i].innerHTML = scoreArr[i]; 
        }
        sum += scoreArr[i];
    }
    let avg = sum/scoreArr.length;
    avgScore.html = "Average Score: " + avg.toFixed(2);
}
function reset() {
    guess.disabled = true;
    guessBtn.disabled = true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }
    guess.value = "";
    guess.placeholder = "";
}