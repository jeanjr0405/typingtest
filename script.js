// JavaScript
const textContainer = document.getElementById('text-container');
const textarea = document.getElementById('textarea');
const restartButton = document.getElementById('restart-button');
const result = document.getElementById('result');
const timer = document.getElementById('timer');

let text = 'escrever sou está errado marcar português texto certo quem foi tirar partir hoje for querer certo porque cortar controlar esteira bom realizar questão verdade nós organizar jogo começar ou acabar palavra isto bem estar aquele ver questão diferente bem criar quando amigo semana seu grande passar nós estar grupo ano eles se momento voltar mulher receber uma dever homem ';
let textArr = text.split('');
let currentPos = 0;
let startTime;
let interval;
let maxTime = 30; 
let timerStarted = false; 

textContainer.innerHTML = textArr.map((letter, index) => {
    return `<span id="letter-${index}">${letter}</span>`;
}).join('');

textarea.addEventListener('input', () => {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    handleInput();
});

restartButton.addEventListener('click', () => {
    restartTest();
});

function handleInput() {
    let inputText = textarea.value;
    if (inputText.length > currentPos) {
        let inputChar = inputText[currentPos];
        if (inputChar === textArr[currentPos]) {
            document.getElementById(`letter-${currentPos}`).style.color = 'green';
        } else {
            document.getElementById(`letter-${currentPos}`).style.color = 'red';
        }
        currentPos++;
    } else if (inputText.length < currentPos) {
        currentPos--;
        document.getElementById(`letter-${currentPos}`).style.color = 'white';
    }

    if (currentPos === textArr.length) {
        clearInterval(interval);
        handleEnd(true); 
    }
}

function handleEnd(completed = false) {
    let endTime = new Date().getTime();
    let timeTaken = (endTime - startTime) / 1000;
    if (!completed && timeTaken > maxTime) timeTaken = maxTime; 
    let wpm = Math.floor((currentPos / 5) / (timeTaken / 60));
    result.textContent = `Você digitou ${wpm} palavras por minuto`;
    textarea.disabled = true; 
}

function restartTest() {
    currentPos = 0;
    clearInterval(interval);
    timerStarted = false;
    textContainer.innerHTML = textArr.map((letter, index) => {
        return `<span id="letter-${index}">${letter}</span>`;
    }).join('');
    textarea.value = '';
    result.textContent = '';
    timer.textContent = `${maxTime} segundos restantes`;
    textarea.disabled = false;
    textarea.focus();
}

function startTimer() {
    startTime = new Date().getTime();
    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let elapsedTime = (new Date().getTime() - startTime) / 1000;
    let remainingTime = maxTime - Math.floor(elapsedTime);
    timer.textContent = `${remainingTime} segundos restantes`;

    if (remainingTime <= 0) {
        clearInterval(interval);
        handleEnd(); 
    }
}


restartTest();
