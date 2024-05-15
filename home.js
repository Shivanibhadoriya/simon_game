var gameColors=["green","red", "yellow" , "blue"];  // collection of colors in game
var gamePattern=[];                                // whatever random color generate store here
var playerPattern=[];                              // whatever user enter 

var started = false;                        
var level =0;                                 // current level of level

 // just for checking the document is focused or not 
if (document.hasFocus()) {                  
  console.log("Document has focus");
} else {
  console.log("Document does not have focus");
}

// before starting game user need to press any key 
document.addEventListener("keypress",function(event){
  console.log("a key was pressed");
  if(!started){
     document.getElementById("level-title").textContent = "Level " + level ;  // it will change the level of game
     nextSequence();                                                          // start generating  color
     started=true;                                                            // now game has started and started value is now true
  }
});


/* whenever user enter any color  this code of line will check ,Is user enter correct  color ? pop up sound and animation for perticular color */
var buttons = document.querySelectorAll(".btn");   
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        var userChosenColour = this.id;
        playerPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(playerPattern.length-1);
    });
});


/* this line of code check the user entered correct colors or not  */
function checkAnswer(currentlevel){                            
  if(gamePattern[currentlevel]  === playerPattern[currentlevel]){  // checking for  current entered untill last entered
    if(currentlevel === gamePattern.length-1){                     //  Is user reach at the end color pattern then again start from next level
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{ 
    /*  whener user enter wrong color then this class add to body tag and change the color into red */
    document.getElementsByTagName("body")[0].classList.add("game-over");  
    playSound("wrong");
    document.getElementById("level-title").textContent ="game Over, Press Any Key to Restart";

    setTimeout(function(){
      document.getElementsByTagName("body")[0].classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence(){                                                             // it will generate the colors of sequences
    playerPattern=[];                                                                // now player pattern initialize to 0 length array
    level++;                                                                         // level increase to zero
    document.getElementById("level-title").textContent="level " +level;     
    var randomNum = Math.floor(Math.random()*4);                                     // generate random value b/w 0-3 
    var randomColor = gameColors[randomNum]                                         // after generating the value take color from gameColor
    gamePattern.push(randomColor);                                                  // push that color into game pattern 
    var element = document.getElementById(randomColor);                             // take info of randomcolor by randomcolor Id
    fadeIn(element).then(fadeOut).then(fadeIn).then(() => playSound(randomColor));    
     // this line of code change opacity and play pop up sound 
  }

/*this code is for changing opacity at the time of new level start */
function fadeOut(element) {
  return new Promise((resolve,reject) =>{
    var opacity = 1;
    var interval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(interval);
            resolve(element);
        }
    }, 10);
  }) 
}
/*this code is for changing opacity at the time of new level start */
function fadeIn(element) {
  return new Promise((resolve,reject)=>{
    var opacity = 0;
    var interval = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(interval);
            resolve(element);
        }
    }, 10);
  })   
 }
/* play sound  according to the colorId because we had provided  same name color Id to the sound   */
function playSound(forColor){
  var audio = new Audio("sounds/"+forColor + ".mp3");
  audio.play();
}
/* animation  whenever user enterd any color */
function animatePress(currentColor){
   document.getElementById(currentColor).classList.add("pressed");
   setTimeout(function(){
     document.getElementById(currentColor).classList.remove("pressed");
    },100);
}
/* now game over  ( chalo fir suruvat se khelte he hahaha....) */
function startOver() {
  level =0;
  gamePattern = [];
  started = false;
}