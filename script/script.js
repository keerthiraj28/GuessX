let randomNum = Math.floor((Math.random() * 100) + 1);

let count = 5;
let gameEnded = false;

const life = document.getElementById("life");
const input = document.getElementById("num");
const btn = document.getElementById("btn");
const result = document.getElementById("rslt");
const answer = document.getElementById("ans");
life.textContent = "Life: " + count;

/*  Sound Elements */
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

console.log("Win sound:", winSound);
console.log("Lose sound:", loseSound);

/* Play sound safely */
function playSound(sound) {
    if (!sound) {
        console.error("Sound not found!");
        return;
    }

    sound.currentTime = 0;
    const playPromise = sound.play();

    if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.warn("Sound play blocked:", err);
        });
    }
}

/* Enter key support */
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        guess();
    }
});

function guess() {
    if (gameEnded) return;

    let number = input.value;

    if (number === "") {
        result.className = "hint";
        result.innerHTML = "Please enter a number";
        return;
    }

    number = Number(number);

    if (number <= 0 || number > 100) {
        result.className = "hint";
        result.innerHTML = "Enter a number between 1 and 100";
        count--;
    }
    else if (number > randomNum) {
        result.className = "hint";
        result.innerHTML = "Go Lower";
        count--;
    }
    else if (number < randomNum) {
        result.className = "hint";
        result.innerHTML = "Go Higher";
        count--;
    }
    else {
        result.className = "win";
        result.innerHTML = "You Won the Game!";

        gameEnded = true;
        playSound(winSound);

        input.disabled = true;
        btn.disabled = true;
        return;
    }

    life.textContent = "Life: " + count;

    /* Clear input for next try */
    input.value = "";
    input.focus();

    if (count === 0) {
        result.className = "lose";
        result.innerHTML = "Game Over!";
        answer.innerHTML = "The Answer was: " + randomNum;

        gameEnded = true;
        playSound(loseSound);

        input.disabled = true;
        btn.disabled = true;
    }
}

function reload() {
    window.location.reload();
}
