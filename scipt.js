// Define HTML elements
const board = document.getElementById('game-board');
const instuctionText = document.getElementById
('instruction-text');
const logo = document.getElementById
('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highscore');

//game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let highScore = 0;
let direction = 'up';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

//draw snake
function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// Tworzenie snake i jedzenia 
function createGameElement (tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//ustaw pozycje snake albo jedzenia
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
    
}

// testowanie funkcji rysowania
//draw();

function drawFood() {
    if(gameStarted)
    { 
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}
// generowanie jedzenie
function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1 ;
    const y = Math.floor(Math.random() * gridSize) + 1 ;
    return{x,y};
}

//funkcja do poruszania wężem
function move(){
    const head = {...snake[0] };
    switch (direction) {
        case 'up':
            head.y--
            break;   
        case 'down':
            head.y++
            break;   
        case 'left':
            head.x--
            break;   
        case 'right':
            head.x++
            break;   
        
    }
    snake.unshift(head);

    // snake.pop();
    if(head.x === food.x && head.y=== food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); 
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();

        }, gameSpeedDelay);
    } else{
        snake.pop();
    }
}

//testowanie funkcji ruszenia
// setInterval(()=> {
//     move(); //ruch pierwszy
//     draw(); //narysuj nową pozycje
// },200);

//startowanie gry
function startGame() {
    gameStarted = true; 
    instuctionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}


function handleKeyPress(event){
    if(
        (!gameStarted && event.code ==='Space') || 
        (!gameStarted && event.code ===' ')
    ){
        startGame();
    } else
    switch(event.key) {
        case 'ArrowUp':
        case 'W':
        case 'w':
            if(direction!=='down')
        {    
        direction = 'up';
        }
            break;
       
       
            case 'ArrowDown':
        case 'S':
        case 's':
            if(direction!=='up')
        {    
        direction = 'down';
        }
            break;
        case 'ArrowRight':
        case 'D':
        case 'd':
            if(direction!=='left')
        {    
        direction = 'right';
        }
            break;
        case 'ArrowLeft':
        case 'A':
        case 'a':
            if(direction!=='right')
        {    
        direction = 'left';
        }
            break;
    
        

    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    //console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150){
        gameSpeedDelay -=5;
    }else if(gameSpeedDelay > 100) {
        gameSpeedDelay -=3;
    }
    else if(gameSpeedDelay > 50) {
        gameSpeedDelay -=2;
    }
    else if(gameSpeedDelay > 20) {
        gameSpeedDelay -=1;
    }
}

function checkCollision(){
    const head = snake[0];

    if(head.x <1 || head.x >gridSize || head.y <1 || head.y > gridSize)
    {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++)
    {
        if(head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() 
{
    updateHighScore();
    stopGame();
    snake = [{x: 10, y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay =200;
    updateScore();

}
function updateScore()
{
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instuctionText.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighScore()
{
    const currentScore = snake.length -1;
    if (currentScore > highScore)
    {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}