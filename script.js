const levelArr = document.getElementsByName("level");
let level, answer, score;

// time difference
let beforetime, aftertime, diff;
let firstname;

//listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click", makeGuess);
name2.addEventListener("click",submitname);

//date arrays and misc
const scoreArr = [];
month1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
day1 = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
"21st", "22nd", "23rd", "24th", "25th",
"26th", "27th", "28th", "29th", "30th", "31st"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function submitname(){
    firstname = nameinput.value;
    firstname = firstname.toLowerCase();
    firstname = capitalizeFirstLetter(firstname);
    name2.disabled = true;
    nameinput.disabled = true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }
    document.getElementById("welcome").innerHTML = "thanks " + firstname + "!"; 
}
function displayClock() {
    const now = new Date();
    let month = now.getMonth();
    let date = now.getDate();
    let year = now.getFullYear();


    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ending = "AM";
    if(hours>12){
        hours = hours - 12;
        ending = "PM";
    }
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    const final = "Today is " + month1[month] + " " + day1[date-1] + ", " + year + "<br> It is " +  hours + ":" + minutes + ":" + seconds + " " + ending;
    document.getElementById("clock").innerHTML = final;
}

  // Update the clock every second
setInterval(displayClock, 1000); 

function play() {
    document.getElementById("welcome").innerHTML = ""; 
    let skib = new Date();
    score = 0;
    for(let i = 0;i<levelArr.length;i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    playBtn.disabled = true;
    guess4.disabled = false;
    guessBtn.disabled = false;

    answer = Math.floor(Math.random()*level)+1;
    msg.innerHTML = "Guess a #1-" + level;
    guess4.placeholder = answer;
    beforetime = skib.getTime();
    console.log(beforetime);
}
let msg2 = "";
function makeGuess() {
    let userGuess = parseInt(guess4.value);
    document.getElementById('guess4').value="";
    if(isNaN(userGuess)||userGuess == ""){
        msg.innerHTML = firstname + "r u sped. Guess a #1-"+level;
        return;
    }
    
    score++;

    //hot, warm, or cold
    let ansdiff = Math.abs(userGuess-answer);
    if(level == 3){
        msg2 = "hot";
    }else if(level == 10){
        if(ansdiff<=2){
            msg2 = "hot";
        }else if(ansdiff<=4){
            msg2 = "warm";
        }else{
            msg2 = "cold";
        }
    }else{
        if(ansdiff<=5){
            msg2 = "hot";
        }else if(ansdiff<=15){
            msg2 = "warm"
        }else{
            msg2 = "cold";
        }
    }

    // hot cold direction
    let direction;
    if(userGuess>answer){
        direction = "⇐";
    }else{
        direction = "⇒"
    }


    if (userGuess<answer){
        msg.innerHTML = "too low " + firstname + ", guess a #1-" + level + ". You are " + msg2 + "( "  + direction + " ).";

    }else if(userGuess>answer){
        msg.innerHTML = "too high " + firstname + ", guess a #1-" + level + ". You are " + msg2 + "("  + direction + ").";
    }else{
        msg.innerHTML = firstname + ", you are correct! You win, it took you  " + score + " tries.";
        const skib2 = new Date();
        aftertime = skib2.getTime();
        console.log(aftertime);
        //get difference between before and after it is guessed 
        diff = (aftertime-beforetime)/1000;
        diff = diff.toPrecision(2);
        scoreArr.push([score,diff]);
        updateScore();
        reset();
    }
}
function updateScore (){
    wins.innerHTML = "Total wins: " + scoreArr.length;
    let g = document.getElementsByName("guess");
    let time1 = document.getElementsByName("time");
    scoreArr.sort((a,b)=>a[0]-b[0]);
    let sum = 0;
    let t1 = 0;
    for(let i = 0;i<scoreArr.length;i++){
        // change 3 to how many positions you want
        if(i<3){
            g[i].innerHTML = scoreArr[i][0];
            time1[i].innerHTML = scoreArr[i][1];
        }
        sum += scoreArr[i][0];
        t1 += scoreArr[i][1];
    }
    let avg = sum/scoreArr.length;
    let avg2 = t1/scoreArr.length;
    avgScore.innerHTML = "average score: " + avg.toFixed(2);
    avgTime.innerHTML = "average time: " + avg2.toFixed(2);




    //sort based on time
    scoreArr.sort((a, b) => a[1] - b[1]);
    let g2 = document.getElementsByName("guess2");
    let time2 = document.getElementsByName("time2");

    for(let i = 0;i<scoreArr.length;i++){
        // change 3 to how many positions you want
        if(i<3){
            time2[i].innerHTML = scoreArr[i][1];
            g2[i].innerHTML = scoreArr[i][0];
        }
    }

}
function reset() {
    guess4.disabled = true;
    guessBtn.disabled = true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }
    guess4.value = "";
    guess4.placeholder = "";
}
function btnmakeguess(){
    if(event.key === 'Enter') {
        makeGuess();
    }
}
function btnentername(){
    if(event.key === 'Enter') {
        submitname();
    }
}
