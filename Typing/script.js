//String to be displayed
var randomStr = '';
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
//Previously pressed key
var pressedKey = '';
//Call main on load
window.onload = main();

//Generate random number from developer.mozilla.org
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function generateText(charCount){
    for (var i=0; i<charCount; i++){
        randomStr += chars.charAt(getRandomNum(0, chars.length-1));
    }
}
function populateTextbox(){
    document.getElementById('text').innerText = randomStr.substring(0, 11);
}

function main(){
    generateText(100);
    populateTextbox();
}

//from codepen.io
var Interval;

var gameStart = false;

function startGame(){
    gameStart = true;
    var seconds = 00;
    var ms = 000;

    //Get elems
    var msElem = document.getElementById('ms');
    var secondsElem = document.getElementById('seconds');    
    var correctElem = document.getElementById('correct');
    var wrongElem = document.getElementById('wrong');
    var speedElem = document.getElementById('speed');
    var accuracyElem = document.getElementById('accuracy');
    
    //Reset statistics
    msElem.innerHTML = seconds;
    secondsElem.innerHTML = ms;
    correctElem.innerHTML = 0;
    wrongElem.innerHTML = 0;
    speedElem.innerHTML = 0;
    accuracyElem.innerHTML = 0;

    clearInterval(Interval);
    Interval = setInterval(startTimer, 1);

    function startTimer(){
        ms++;
        if (ms <= 9){
            msElem.innerHTML = '00' + ms;
        }

        if (ms > 9){
            msElem.innerHTML = '0' + ms;
        }

        if (ms > 9){
            msElem.innerHTML = '0' + ms;
        }

        if (ms > 99){
            ms.innerHTML = ms;
        }

        if (ms > 999){
            seconds ++;
            secondsElem.innerHTML = '0' + seconds;
            ms = 0;
            ms.innerHTML = 000;
        }

        if (seconds > 9){
            secondsElem.innerHTML = seconds;
        }
        
        //Update speed 
        if (parseInt(document.getElementById('seconds').innerHTML) >= 1){
            var newSpeed = parseInt(document.getElementById('correct').innerHTML)/parseFloat(document.getElementById('time').innerText.substring(14));
            document.getElementById('speed').innerHTML = newSpeed;
        }
    }
}

function endGame(){
    clearInterval(Interval);
    //Clear key colour
    document.getElementById(pressedKey).style.background = null;
    gameStart = false;
}

//Add event listener for key press
document.addEventListener("keypress", function(event){
    if (gameStart){
        keyPressed(event.key);
    }
    
});

function keyPressed(key){
    //Comapare pressed key with first letter r
    //If correct 
    if (key.toUpperCase() == randomStr.substring(0,1)){
        //Change colour of correct key
        document.getElementById(key).style.backgroundColor = 'green';
        //Update correct count
        var newVal = parseInt(document.getElementById('correct').innerHTML) + 1;
        document.getElementById('correct').innerHTML = newVal;
        //Generate new character 
        generateText(1);
        //Remove correct char from display string 
        randomStr = randomStr.substring(1);
        //Update textbox 
        populateTextbox();
    }

    //If wrong 
    else {
        //Change colour of wrong key
        document.getElementById(key).style.backgroundColor = 'red';
        //Update correct count
        var newVal = parseInt(document.getElementById('wrong').innerHTML) + 1;
        document.getElementById('wrong').innerHTML = newVal;
    }

    //Update accuracy 
    var correctCount = parseInt(document.getElementById('correct').innerHTML);
    var totalCount = correctCount + parseInt(document.getElementById('wrong').innerHTML);
    document.getElementById('accuracy').innerHTML = correctCount / totalCount;

    //Clear previously pressed key 

    if (pressedKey==''){
        pressedKey = key;
    }
    else{
        if (pressedKey!=key){
            document.getElementById(pressedKey).style.backgroundColor = null;
            pressedKey = key;
        }
    }

}