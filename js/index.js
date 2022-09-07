//Game constants and variables
let inputDir = {x:0,y:0};
const foodSound= new Audio("asset/audios/food.mp3");
const gameOverSound= new Audio("asset/audios/gameover.mp3");
const moveSound= new Audio("asset/audios/move.mp3");
const musicSound= new Audio("asset/audios/music.mp3");
let speed= 9;
let lastPaintTime=0;
let score= 0;
let snakeArr = [
    {x:13,y:15}
]

let food= {x:15,y:15}

//change level
 document.querySelector(".easy").addEventListener("click", ()=>{
    speed= 5;
 })

 document.querySelector(".medium").addEventListener("click", ()=>{
    speed= 9;
 })

 document.querySelector(".hard").addEventListener("click", ()=>{
    speed= 18;
 })

//Game Function
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return; 
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for (let i=1; i< snakeArr.length; i++){
        if(snake[i].x=== snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
   //part 1: Updating the snake array and food;
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again")
        score=0;
        scoreBox.innerHTML="Score: " +score;
        snakeArr = [{x:13,y:15}];
    }

    // if you have eaten the food, increment and regenerate the food
    if(snakeArr[0].y=== food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score += 1;
        if(score> highScoreval){
            highScoreval= score;
            localStorage.setItem("High Score", JSON.stringify(highScoreval));
            highscoreBox.innerHTML = "High Score: "+ highScoreval;
        }
        scoreBox.innerHTML="Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a= 2;
        let b= 16;
        food= {x:Math.round(a+ (b-a)*Math.random()),y:Math.round(a+ (b-a)*Math.random())}
    }
     //Moving the snake
     for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


   //part 2: Display the snake array and food
   //Display the snake
   board.innerHTML= "";
   snakeArr.forEach((e, index)=>{
    snakeElement= document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index===0){
        snakeElement.classList.add("head")
    }
    else{
        snakeElement.classList.add("snake")
    }
    board.appendChild(snakeElement);
   });
   //display the food
    foodElement= document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}

//Main logic starts here
// musicSound.play();
let highScore = localStorage.getItem("High Score")
if(highScore === null){
    highScoreval = 0;
    localStorage.setItem("High Score", JSON.stringify(highScoreval))
}
else{
    highScoreval= JSON.parse(highScore)
    highscoreBox.innerHTML="High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir = {x:0,y:1}
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x =0;
            inputDir.y =-1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x =0;
            inputDir.y =1;
            break;
            
            case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x =-1;
        inputDir.y =0;
        break;
        
        case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x =1;
        inputDir.y =0;
        break;

        default:
            break;
    }
})