const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let isJumping = false;
let isGameOver = false;

const jump = () => {
    if (!isJumping && !isGameOver) {
        isJumping = true;
        mario.style.bottom = '150px';
        setTimeout(() => {
            mario.style.bottom = '0px';
            isJumping = false;
        }, 300); // Tempo de animação de salto reduzido para 300ms
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!isGameOver) {
            jump();
        } else {
            resetGame();
        }
    }
});

const checkCollision = () => {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    if (
        marioRect.bottom >= pipeRect.top &&
        marioRect.top <= pipeRect.bottom &&
        marioRect.right >= pipeRect.left &&
        marioRect.left <= pipeRect.right
    ) {
        gameOver();
    }
}

const gameOver = () => {
    clearInterval(gameLoop);
    isGameOver = true;
    mario.src = "../src/images/mario-over.gif";
    mario.style.width = "50%";
    mario.style.marginLeft = "50px";
}

const resetGame = () => {
    isGameOver = false;
    mario.src = "../src/images/mario (1).gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0";
    gameLoop = setInterval(() => {
        checkCollision();
    }, 100);
}

let gameLoop = setInterval(() => {
    checkCollision();
}, 100); // Intervalo de verificação de colisão mantido em 100ms
