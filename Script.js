let score = 0
let snakeBox = document.getElementsByClassName("snakeBox")[0];
let board = document.getElementsByClassName("board")[0];
let snake;
let positionX = 10;
let positionY = 10;
let boardsWidth = board.offsetWidth;
let boardsHeight = board.offsetHeight;
let intervalId;
let foodElement;
let scoreElement = document.createElement('div')
document.body.appendChild(scoreElement)
scoreElement.classList.add('score')
scoreElement.textContent = `Score ${score}`
function foodPos(){
let posY = Math.floor(Math.random() * (boardsHeight-15))
let posX = Math.floor(Math.random() * (boardsWidth-15))
foodElement.style.left = `${posX}px`;
foodElement.style.top = `${posY}px`;
}

function drawFood(){
foodElement = document.createElement('div')
foodElement.classList.add('food')
board.appendChild(foodElement)
foodPos()
}
drawFood()
function drawSnake() {
snake = document.createElement('div');
snake.classList.add("snake");
snakeBox.appendChild(snake);
}

drawSnake();


function automv(axis, sign) {
if (intervalId) {
clearInterval(intervalId);
}

if (axis === 'X') {
if (sign === '+') {
loss()
if (positionX + 30 < boardsWidth) {
intervalId = setInterval(function() {
if (positionX + 20 < boardsWidth) {
positionX += 5;
snakeBox.style.left = `${positionX}px`;
loss()
} else {
clearInterval(intervalId);
}
}, 150);
}

} else if (sign === '-') {
loss()
if (positionX - 10 >= 0) {
intervalId = setInterval(function() {
if (positionX - 2 >= 0) {
positionX -= 5;
snakeBox.style.left = `${positionX}px`;
loss()
} else {
clearInterval(intervalId);
}
}, 150);
}
}
} else if (axis === 'Y') {
if (sign === '+') {
loss()
if (positionY + 30 < boardsHeight) {
intervalId = setInterval(function() {
if (positionY + 25 < boardsHeight) {
positionY += 5;
snakeBox.style.top = `${positionY}px`;
loss()
} else {
clearInterval(intervalId);
}
}, 150);
}
} else if (sign === '-') {

if (positionY - 10 >= 0) {
intervalId = setInterval(function() {
if (positionY - 5 >= 0) {
positionY -= 5;
snakeBox.style.top = `${positionY}px`;
loss()
} else {
clearInterval(intervalId);
}
}, 150);
}
}
}
}


automv('X', '+');

function updateSnake() {
snakeBox.style.left = `${positionX}px`;
snakeBox.style.top = `${positionY}px`;
}

updateSnake();

function right() {
if (positionX + 30 < boardsWidth) {
positionX += 10;
updateSnake();
automv('X', '+');
console.log("right");
}
win()
loss()
}

function left() {
if (positionX - 10 >= 0) {
positionX -= 10;
updateSnake();
automv('X', '-');
console.log("left");
}
win()
loss()
}

function mvtop() {
if (positionY - 10 >= 0) {
positionY -= 10;
updateSnake();
automv('Y', '-');
console.log("top");
}
win()
loss()
}

function bottom() {
if (positionY + 28 < boardsHeight) {
positionY += 10;
updateSnake();
automv('Y', '+');
console.log("btm");
}
win()
loss()
}




function win() {
let snakeLeft = parseInt(snakeBox.style.left);
let snakeTop = parseInt(snakeBox.style.top);
let foodLeft = parseInt(foodElement.style.left);
let foodTop = parseInt(foodElement.style.top);

if (Math.abs(snakeLeft - foodLeft) <= 10 && Math.abs(snakeTop - foodTop) <= 10) {
score++;
scoreElement.textContent = `score ${score}`
board.removeChild(foodElement)
drawFood()
}
}


function loss() {
if (positionX <= 0 || positionX + 27 >= boardsWidth || positionY <= 0 || positionY + 27 >= boardsHeight) {
score = 0
scoreElement.textContent = `score ${score}`
clearInterval(intervalId);
alert("Game Over!");
}
}